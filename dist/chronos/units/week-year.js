import { addFormatToken } from '../format/format';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
import { addRegexToken, match1to2, match1to4, match1to6, match2, match4, match6, matchSigned } from '../parse/regex';
import { addWeekParseToken } from '../parse/token';
import { toInt } from '../utils/type-checks';
import { parseTwoDigitYear } from './year';
import { dayOfYearFromWeeks, weekOfYear, weeksInYear } from './week-calendar-utils';
import { createUTCDate } from '../create/date-from-array';
import { getISOWeek, getWeek } from './week';
import { getISODayOfWeek, getLocaleDayOfWeek } from './day-of-week';
import { getLocale } from '../locale/locales';
import { setDate, setFullYear, setMonth } from '../utils/date-setters';
import { getDate, getFullYear, getMonth } from '../utils/date-getters';
// FORMATTING
addFormatToken(null, ['gg', 2, false], null, function (date, opts) {
    // return this.weekYear() % 100;
    return (getWeekYear(date, opts.locale) % 100).toString();
});
addFormatToken(null, ['GG', 2, false], null, function (date) {
    // return this.isoWeekYear() % 100;
    return (getISOWeekYear(date) % 100).toString();
});
function addWeekYearFormatToken(token, getter) {
    addFormatToken(null, [token, token.length, false], null, getter);
}
function _getWeekYearFormatCb(date, opts) {
    return getWeekYear(date, opts.locale).toString();
}
function _getISOWeekYearFormatCb(date) {
    return getISOWeekYear(date).toString();
}
addWeekYearFormatToken('gggg', _getWeekYearFormatCb);
addWeekYearFormatToken('ggggg', _getWeekYearFormatCb);
addWeekYearFormatToken('GGGG', _getISOWeekYearFormatCb);
addWeekYearFormatToken('GGGGG', _getISOWeekYearFormatCb);
// ALIASES
addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');
// PRIORITY
addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);
// PARSING
addRegexToken('G', matchSigned);
addRegexToken('g', matchSigned);
addRegexToken('GG', match1to2, match2);
addRegexToken('gg', match1to2, match2);
addRegexToken('GGGG', match1to4, match4);
addRegexToken('gggg', match1to4, match4);
addRegexToken('GGGGG', match1to6, match6);
addRegexToken('ggggg', match1to6, match6);
addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
    return config;
});
addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = parseTwoDigitYear(input);
    return config;
});
// MOMENTS
export function getSetWeekYear(date, input, locale) {
    if (locale === void 0) { locale = getLocale(); }
    return getSetWeekYearHelper(date, input, 
    // this.week(),
    getWeek(date, locale), 
    // this.weekday(),
    getLocaleDayOfWeek(date, locale), locale.firstDayOfWeek(), locale.firstDayOfYear());
}
export function getWeekYear(date, locale) {
    if (locale === void 0) { locale = getLocale(); }
    return weekOfYear(date, locale.firstDayOfWeek(), locale.firstDayOfYear()).year;
}
export function getSetISOWeekYear(date, input) {
    return getSetWeekYearHelper(date, input, getISOWeek(date), getISODayOfWeek(date), 1, 4);
}
export function getISOWeekYear(date) {
    return weekOfYear(date, 1, 4).year;
}
export function getISOWeeksInYear(date, isUTC) {
    return weeksInYear(getFullYear(date, isUTC), 1, 4);
}
export function getWeeksInYear(date, isUTC, locale) {
    if (locale === void 0) { locale = getLocale(); }
    return weeksInYear(getFullYear(date, isUTC), locale.firstDayOfWeek(), locale.firstDayOfYear());
}
function getSetWeekYearHelper(date, input, week, weekday, dow, doy) {
    if (!input) {
        return getWeekYear(date);
    }
    var weeksTarget = weeksInYear(input, dow, doy);
    var _week = week > weeksTarget ? weeksTarget : week;
    return setWeekAll(date, input, _week, weekday, dow, doy);
}
function setWeekAll(date, weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
    var _date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
    setFullYear(_date, getFullYear(_date, true));
    setMonth(_date, getMonth(_date, true));
    setDate(_date, getDate(_date, true));
    return _date;
}
//# sourceMappingURL=week-year.js.map