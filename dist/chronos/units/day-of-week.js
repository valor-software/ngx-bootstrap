import { addFormatToken } from '../format/format';
import { getDay } from '../utils/date-getters';
import { addRegexToken, match1to2 } from '../parse/regex';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
import { addWeekParseToken } from '../parse/token';
import { getParsingFlags } from '../create/parsing-flags';
import { isNumber, isString, toInt } from '../utils/type-checks';
import { add } from '../moment/add-subtract';
import { getLocale } from '../locale/locales';
// FORMATTING
addFormatToken('d', null, 'do', function (date, opts) {
    return getDay(date, opts.isUTC).toString(10);
});
addFormatToken('dd', null, null, function (date, opts) {
    return opts.locale.weekdaysMin(date, opts.format, opts.isUTC);
});
addFormatToken('ddd', null, null, function (date, opts) {
    return opts.locale.weekdaysShort(date, opts.format, opts.isUTC);
});
addFormatToken('dddd', null, null, function (date, opts) {
    return opts.locale.weekdays(date, opts.format, opts.isUTC);
});
addFormatToken('e', null, null, function (date, opts) {
    return getLocaleDayOfWeek(date, opts.locale, opts.isUTC).toString(10);
    // return getDay(date, opts.isUTC).toString(10);
});
addFormatToken('E', null, null, function (date, opts) {
    return getISODayOfWeek(date, opts.isUTC).toString(10);
});
// ALIASES
addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');
// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);
// PARSING
addRegexToken('d', match1to2);
addRegexToken('e', match1to2);
addRegexToken('E', match1to2);
addRegexToken('dd', function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd', function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd', function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});
addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    }
    else {
        getParsingFlags(config).invalidWeekday = !!input;
    }
    return config;
});
addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
    return config;
});
// HELPERS
export function parseWeekday(input, locale) {
    if (!isString(input)) {
        return input;
    }
    var _num = parseInt(input, 10);
    if (!isNaN(_num)) {
        return _num;
    }
    var _weekDay = locale.weekdaysParse(input);
    if (isNumber(_weekDay)) {
        return _weekDay;
    }
    return null;
}
export function parseIsoWeekday(input, locale) {
    if (locale === void 0) { locale = getLocale(); }
    if (isString(input)) {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNumber(input) && isNaN(input) ? null : input;
}
// MOMENTS
export function getSetDayOfWeek(date, input, opts) {
    if (!input) {
        return getDayOfWeek(date, opts.isUTC);
    }
    return setDayOfWeek(date, input, opts.locale, opts.isUTC);
}
export function setDayOfWeek(date, input, locale, isUTC) {
    if (locale === void 0) { locale = getLocale(); }
    var day = getDay(date, isUTC);
    var _input = parseWeekday(input, locale);
    return add(date, _input - day, 'day');
}
export function getDayOfWeek(date, isUTC) {
    return getDay(date, isUTC);
}
/********************************************/
// todo: utc
// getSetLocaleDayOfWeek
export function getLocaleDayOfWeek(date, locale, isUTC) {
    if (locale === void 0) { locale = getLocale(); }
    return (getDay(date, isUTC) + 7 - locale.firstDayOfWeek()) % 7;
}
export function setLocaleDayOfWeek(date, input, opts) {
    if (opts === void 0) { opts = {}; }
    var weekday = getLocaleDayOfWeek(date, opts.locale, opts.isUTC);
    return add(date, input - weekday, 'day');
}
// getSetISODayOfWeek
export function getISODayOfWeek(date, isUTC) {
    return getDay(date, isUTC) || 7;
}
export function setISODayOfWeek(date, input, opts) {
    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.
    if (opts === void 0) { opts = {}; }
    var weekday = parseIsoWeekday(input, opts.locale);
    return setDayOfWeek(date, getDayOfWeek(date) % 7 ? weekday : weekday - 7);
}
//# sourceMappingURL=day-of-week.js.map