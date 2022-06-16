
async function init() {
    const config = await loadConfig();
    setPageTitle(config);
}

async function loadConfig() {
    return new Promise(resolve => {
        chrome.storage.sync.get("config", ({ config }) => {
            resolve(config);
        });
    });
}

function isMatch(url) {
    try {
        return new RegExp(url).test(window.location.href);
    } catch(ignore) {}
}

function setPageTitle(config) {
    const match = config?.items?.find(item => item?.url?.length && isMatch(item.url));
    if (match) {
        document.title = `${match.text} ${document.title}`;
    }
}

init();
