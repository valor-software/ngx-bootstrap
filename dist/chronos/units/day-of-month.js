import { addFormatToken } from '../format/format';
import { getDate } from '../utils/date-getters';
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { DATE } from './constants';
import { toInt } from '../utils/type-checks';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
// FORMATTING
addFormatToken('D', ['DD', 2, false], 'Do', function (date, opts) {
    return getDate(date, opts.isUTC).toString(10);
});
// ALIASES
addUnitAlias('date', 'D');
// PRIOROITY
addUnitPriority('date', 9);
// PARSING
addRegexToken('D', match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    return locale._dayOfMonthOrdinalParse || locale._ordinalParse;
});
addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array, config) {
    array[DATE] = toInt(input.match(match1to2)[0]);
    return config;
});
//# sourceMappingURL=day-of-month.js.map