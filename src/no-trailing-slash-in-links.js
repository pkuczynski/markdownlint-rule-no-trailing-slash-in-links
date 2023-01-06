// Based on https://github.com/DavidAnson/markdownlint/blob/2b2dc27f24a16a2afdf66d850a247f7ce02df6c8/lib/md042.js

const {
  addError,
  escapeForRegExp,
  filterTokens
} = require('markdownlint-rule-helpers');

module.exports = {
  "names": ["no-trailing-slash-in-links"],
  "description": "No trailing slash in links",
  "tags": ["links"],
  "function": function noTrailingSlashInLinks(params, onError) {
    filterTokens(params, "inline", function forToken(token) {
      let inLink = false;
      let linkText = '';
      let linkUrl = '';
      let hasTrailingSlash = false;
      for (const child of token.children) {
        if (child.type === "link_open") {
          inLink = true;
          linkText = '';
          linkUrl = '';
          for (const attr of child.attrs) {
            if (attr[0] === "href" && attr[1].endsWith('/')) {
              hasTrailingSlash = true;
              linkUrl = attr[1];
            }
          }
        } else if (child.type === "link_close") {
          inLink = false;
          if (hasTrailingSlash) {
            let context = `[${linkText}]`;
            const normalLinkRegex = new RegExp(`${escapeForRegExp(context)}\\((${escapeForRegExp(linkUrl)})\\)`);  // Match: [Title](URL)
            const bareLinkRegex = new RegExp(`<(${escapeForRegExp(linkUrl)})>`);  // Match: <URL>
            // Match Markdown link
            const match = child.line.match(normalLinkRegex) || child.line.match(bareLinkRegex);
            if (match) {
              let trailingSlashIndex = match.index + match[0].length - 1;
              let trailingSlashLen = 1;
              let range = [trailingSlashIndex, trailingSlashLen];
              let fixInfo = {
                'editColumn': trailingSlashIndex,
                'deleteCount': trailingSlashLen,
              };
              addError(onError, child.lineNumber, null /* detail */, null /* context */, range, fixInfo);
            }
            hasTrailingSlash = false;
          }
        } else if (inLink) {
          linkText += child.content;
        }
      }
    });
  }
};
