import { latinMap } from './latin-map';
export function latinize(str) {
    if (!str) {
        return '';
    }
    return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a) {
        return latinMap[a] || a;
    });
}
export function escapeRegexp(queryToEscape) {
    // Regex: capture the whole query string and replace it with the string
    // that will be used to match the results, for example if the capture is
    // 'a' the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}
/* tslint:disable */
export function tokenize(str, wordRegexDelimiters = ' ', phraseRegexDelimiters = '', delimitersForMultipleSearch) {
    let result = [];
    if (!delimitersForMultipleSearch) {
        result = tokenizeWordsAndPhrases(str, wordRegexDelimiters, phraseRegexDelimiters);
    }
    else {
        const multipleSearchRegexStr = `([${delimitersForMultipleSearch}]+)`;
        const delimitedTokens = str.split(new RegExp(multipleSearchRegexStr, 'g'));
        const lastToken = delimitedTokens[delimitedTokens.length - 1];
        if (lastToken > '') {
            if (wordRegexDelimiters && phraseRegexDelimiters) {
                result = tokenizeWordsAndPhrases(lastToken, wordRegexDelimiters, phraseRegexDelimiters);
            }
            else {
                result.push(lastToken);
            }
        }
    }
    return result;
}
function tokenizeWordsAndPhrases(str, wordRegexDelimiters, phraseRegexDelimiters) {
    const result = [];
    /* tslint:enable */
    const regexStr = `(?:[${phraseRegexDelimiters}])([^${phraseRegexDelimiters}]+)` +
        `(?:[${phraseRegexDelimiters}])|([^${wordRegexDelimiters}]+)`;
    const preTokenized = str.split(new RegExp(regexStr, 'g'));
    const preTokenizedLength = preTokenized.length;
    let token;
    const replacePhraseDelimiters = new RegExp(`[${phraseRegexDelimiters}]+`, 'g');
    for (let i = 0; i < preTokenizedLength; i += 1) {
        token = preTokenized[i];
        if (token && token.length && token !== wordRegexDelimiters) {
            result.push(token.replace(replacePhraseDelimiters, ''));
        }
    }
    return result;
}
// tslint:disable-next-line:no-any
export function getValueFromObject(object, option) {
    if (!option || typeof object !== 'object') {
        return object.toString();
    }
    if (option.endsWith('()')) {
        const functionName = option.slice(0, option.length - 2);
        return object[functionName]().toString();
    }
    const properties = option
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '');
    const propertiesArray = properties.split('.');
    for (const property of propertiesArray) {
        if (property in object) {
            // tslint:disable-next-line
            object = object[property];
        }
    }
    if (!object) {
        return '';
    }
    return object.toString();
}
//# sourceMappingURL=typeahead-utils.js.map