// tslint:disable:no-bitwise
// FORMATTING
import { addFormatToken } from '../format/format';
import { addRegexToken, match1, match1to3, match2, match3, matchUnsigned } from '../parse/regex';
import { MILLISECOND } from './constants';
import { toInt } from '../utils/type-checks';
import { addParseToken } from '../parse/token';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
import { getMilliseconds } from '../utils/date-getters';
addFormatToken('S', null, null, function (date, opts) {
    return (~~(getMilliseconds(date, opts.isUTC) / 100)).toString(10);
});
addFormatToken(null, ['SS', 2, false], null, function (date, opts) {
    return (~~(getMilliseconds(date, opts.isUTC) / 10)).toString(10);
});
addFormatToken(null, ['SSS', 3, false], null, function (date, opts) {
    return (getMilliseconds(date, opts.isUTC)).toString(10);
});
addFormatToken(null, ['SSSS', 4, false], null, function (date, opts) {
    return (getMilliseconds(date, opts.isUTC) * 10).toString(10);
});
addFormatToken(null, ['SSSSS', 5, false], null, function (date, opts) {
    return (getMilliseconds(date, opts.isUTC) * 100).toString(10);
});
addFormatToken(null, ['SSSSSS', 6, false], null, function (date, opts) {
    return (getMilliseconds(date, opts.isUTC) * 1000).toString(10);
});
addFormatToken(null, ['SSSSSSS', 7, false], null, function (date, opts) {
    return (getMilliseconds(date, opts.isUTC) * 10000).toString(10);
});
addFormatToken(null, ['SSSSSSSS', 8, false], null, function (date, opts) {
    return (getMilliseconds(date, opts.isUTC) * 100000).toString(10);
});
addFormatToken(null, ['SSSSSSSSS', 9, false], null, function (date, opts) {
    return (getMilliseconds(date, opts.isUTC) * 1000000).toString(10);
});
// ALIASES
addUnitAlias('millisecond', 'ms');
// PRIORITY
addUnitPriority('millisecond', 16);
// PARSING
addRegexToken('S', match1to3, match1);
addRegexToken('SS', match1to3, match2);
addRegexToken('SSS', match1to3, match3);
var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}
function parseMs(input, array, config) {
    array[MILLISECOND] = toInt(parseFloat("0." + input) * 1000);
    return config;
}
for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS
//# sourceMappingURL=millisecond.js.map