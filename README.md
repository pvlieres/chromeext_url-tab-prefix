# URL based tab prefix

Define texts that prefix the title text of a website in the tab. This might be useful when testing a website on multiple environments where the favicons look the same.

## How?
URL pattern is a regular expression that the current page's URL is tested against. On match, the page's title gets prefixed with the related text.


## Examples
- URL pattern: `stage.my-project.dev`
- Text: `[STAGE]`
- Result: Would prefix the page title of all pages whose URL contains `stage.my-project.dev` with `[STAGE]`.
---
- URL pattern: `^http://localhost:4\d+`
- Text: `[DEV]`
- Result: Would prefix the page title of all pages whose URL starts with `http://localhost:4` followed by at least one number (e.g. `http://localhost:4200`) with `[DEV]`.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
