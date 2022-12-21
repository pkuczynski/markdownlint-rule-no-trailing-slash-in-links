# markdownlint-rule-no-trailing-slash-in-links

[![npm](https://img.shields.io/npm/v/markdownlint-rule-no-trailing-slash-in-links?color=blue)](https://www.npmjs.com/package/markdownlint-rule-no-trailing-slash-in-links)

The [markdownlint](https://github.com/DavidAnson/markdownlint) rule to check if there is trailing slash in links.

## Installation

```shell
yarn add markdownlint-rule-no-trailing-slash-in-links
```

## Usage

Edit `.markdownlint-cli2.jsonc`, add `markdownlint-rule-no-trailing-slash-in-links` to `customRules`:

```json
{
  "customRules": [
    "markdownlint-rule-no-trailing-slash-in-links/src/no-trailing-slash-in-links.js"
  ],
  "config": {
    "no-trailing-slash-in-links": true
  }
}
```
