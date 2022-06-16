document.addEventListener('DOMContentLoaded', init);

const _ = {
    items: [],
    tableBody: undefined,
    saveBtn: undefined,
};

async function init() {
    _.tableBody = document.getElementById('table-body');

    const config = await loadConfig();
    if (config) {
        _.items = [...(config.items ?? []), {}];
        populateForm();
    }
}

function populateForm() {
    _.tableBody.innerHTML = '';
    _.items.forEach((item, index) => {
        const node = createConfigHtmlElement(item, index);
        _.tableBody.appendChild(node);
    });
}

function createConfigHtmlElement(item, index) {
    const urlInput = document.createElement('input');
    urlInput.value = item.url ?? '';
    urlInput.onkeyup = handleKeyUp;
    urlInput.placeholder = 'URL pattern';
    const urlTd = document.createElement('td');
    urlTd.appendChild(urlInput);

    const textInput = document.createElement('input');
    textInput.value = item.text ?? '';
    textInput.onkeyup = handleKeyUp;
    textInput.placeholder = 'Prefix text';
    const textTd = document.createElement('td');
    textTd.appendChild(textInput);

    const deleteBtn = document.createElement('button');
    deleteBtn.addEventListener('click', () => deleteItem(index));
    const deleteTd = document.createElement('td');
    deleteTd.appendChild(deleteBtn);

    const tr = document.createElement('tr');
    tr.appendChild(urlTd);
    tr.appendChild(textTd);
    tr.appendChild(deleteTd);

    return tr;
}

async function loadConfig() {
    return new Promise(resolve => {
        chrome.storage.sync.get("config", ({ config }) => {
            resolve(config);
        });
    });
}

function handleKeyUp() {
    saveConfig();
    addPlaceholderRow();
}

function saveConfig() {
    const config = getValuesFromFormFields();
    chrome.storage.sync.set({config: { items: config }});
    _.items = config;
}

function getValuesFromFormFields() {
    return [...(_.tableBody.children ?? [])].map(tr => {
        const [urlInput, textInput] = tr.getElementsByTagName('input');

        return {
            url: urlInput.value,
            text: textInput.value
        };
    }).filter(item => item.url || item.text);
}

function hasPlaceHolderItem() {
    return [...(_.tableBody.children ?? [])].some(tr => {
        const inputFields = [...(tr.querySelectorAll('input') ?? [])];
        return inputFields.every(inputField => !inputField.value);
    });
}

function addPlaceholderRow() {
    if (!hasPlaceHolderItem()) {
        const placeHolderItem = {};
        _.items.push(placeHolderItem);
        const node = createConfigHtmlElement(placeHolderItem, _.tableBody.children.length);
        _.tableBody.appendChild(node);
    }
}

function deleteItem(index) {
    const inputFields = [...(_.tableBody.children ?? [])][index]?.querySelectorAll('input');
    inputFields?.forEach(element => element.value = '');
    saveConfig();
    populateForm();
    addPlaceholderRow();
}
