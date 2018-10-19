import { addFormatToken } from '../format/format';
import { weekOfYear } from './week-calendar-utils';
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
import { addWeekParseToken } from '../parse/token';
import { toInt } from '../utils/type-checks';
import { getLocale } from '../locale/locales';
import { add } from '../moment/add-subtract';
// FORMATTING
addFormatToken('w', ['ww', 2, false], 'wo', function (date, opts) {
    return getWeek(date, opts.locale).toString(10);
});
addFormatToken('W', ['WW', 2, false], 'Wo', function (date) {
    return getISOWeek(date).toString(10);
});
// ALIASES
addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');
// PRIORITIES
addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);
// PARSING
addRegexToken('w', match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W', match1to2);
addRegexToken('WW', match1to2, match2);
addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
    return config;
});
// export function getSetWeek (input) {
//   var week = this.localeData().week(this);
//   return input == null ? week : this.add((input - week) * 7, 'd');
// }
export function setWeek(date, input, locale) {
    if (locale === void 0) { locale = getLocale(); }
    var week = getWeek(date, locale);
    return add(date, (input - week) * 7, 'day');
}
export function getWeek(date, locale) {
    if (locale === void 0) { locale = getLocale(); }
    return locale.week(date);
}
// export function getSetISOWeek (input) {
//   var week = weekOfYear(this, 1, 4).week;
//   return input == null ? week : this.add((input - week) * 7, 'd');
// }
export function setISOWeek(date, input) {
    var week = getISOWeek(date);
    return add(date, (input - week) * 7, 'day');
}
export function getISOWeek(date) {
    return weekOfYear(date, 1, 4).week;
}
//# sourceMappingURL=week.js.map