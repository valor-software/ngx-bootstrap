import { getHours, getMinutes, getSeconds } from '../utils/date-getters';
import { addFormatToken } from '../format/format';
import { zeroFill } from '../utils/zero-fill';
import { addRegexToken, match1to2, match2, match3to4, match5to6 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { HOUR, MINUTE, SECOND } from './constants';
import { toInt } from '../utils/type-checks';
import { getParsingFlags } from '../create/parsing-flags';
import { addUnitPriority } from './priorities';
import { addUnitAlias } from './aliases';
// FORMATTING
function hFormat(date, isUTC) {
    return getHours(date, isUTC) % 12 || 12;
}
function kFormat(date, isUTC) {
    return getHours(date, isUTC) || 24;
}
addFormatToken('H', ['HH', 2, false], null, function (date, opts) {
    return getHours(date, opts.isUTC).toString(10);
});
addFormatToken('h', ['hh', 2, false], null, function (date, opts) {
    return hFormat(date, opts.isUTC).toString(10);
});
addFormatToken('k', ['kk', 2, false], null, function (date, opts) {
    return kFormat(date, opts.isUTC).toString(10);
});
addFormatToken('hmm', null, null, function (date, opts) {
    var _h = hFormat(date, opts.isUTC);
    var _mm = zeroFill(getMinutes(date, opts.isUTC), 2);
    return "" + _h + _mm;
});
addFormatToken('hmmss', null, null, function (date, opts) {
    var _h = hFormat(date, opts.isUTC);
    var _mm = zeroFill(getMinutes(date, opts.isUTC), 2);
    var _ss = zeroFill(getSeconds(date, opts.isUTC), 2);
    return "" + _h + _mm + _ss;
});
addFormatToken('Hmm', null, null, function (date, opts) {
    var _H = getHours(date, opts.isUTC);
    var _mm = zeroFill(getMinutes(date, opts.isUTC), 2);
    return "" + _H + _mm;
});
addFormatToken('Hmmss', null, null, function (date, opts) {
    var _H = getHours(date, opts.isUTC);
    var _mm = zeroFill(getMinutes(date, opts.isUTC), 2);
    var _ss = zeroFill(getSeconds(date, opts.isUTC), 2);
    return "" + _H + _mm + _ss;
});
function meridiem(token, lowercase) {
    addFormatToken(token, null, null, function (date, opts) {
        return opts.locale.meridiem(getHours(date, opts.isUTC), getMinutes(date, opts.isUTC), lowercase);
    });
}
meridiem('a', true);
meridiem('A', false);
// ALIASES
addUnitAlias('hour', 'h');
// PRIORITY
addUnitPriority('hour', 13);
// PARSING
function matchMeridiem(isStrict, locale) {
    return locale._meridiemParse;
}
addRegexToken('a', matchMeridiem);
addRegexToken('A', matchMeridiem);
addRegexToken('H', match1to2);
addRegexToken('h', match1to2);
addRegexToken('k', match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);
addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);
addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
    return config;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
    return config;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
    return config;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
    return config;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
    return config;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    return config;
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    return config;
});
//# sourceMappingURL=hour.js.map