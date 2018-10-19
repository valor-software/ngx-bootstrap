import { addFormatToken } from '../format/format';
import { startOf } from '../utils/start-end-of';
import { addRegexToken, match1to3, match3 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { addUnitPriority } from './priorities';
import { addUnitAlias } from './aliases';
import { toInt } from '../utils/type-checks';
import { add } from '../moment/add-subtract';
// FORMATTING
addFormatToken('DDD', ['DDDD', 3, false], 'DDDo', function (date) {
    return getDayOfYear(date).toString(10);
});
// ALIASES
addUnitAlias('dayOfYear', 'DDD');
// PRIORITY
addUnitPriority('dayOfYear', 4);
addRegexToken('DDD', match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
    return config;
});
export function getDayOfYear(date) {
    var date1 = +startOf(date, 'day');
    var date2 = +startOf(date, 'year');
    var someDate = date1 - date2;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.round(someDate / oneDay) + 1;
}
export function setDayOfYear(date, input) {
    var dayOfYear = getDayOfYear(date);
    return add(date, (input - dayOfYear), 'day');
}
//# sourceMappingURL=day-of-year.js.map