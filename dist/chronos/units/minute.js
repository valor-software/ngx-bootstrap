import { addFormatToken } from '../format/format';
import { getMinutes } from '../utils/date-getters';
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { MINUTE } from './constants';
import { addUnitPriority } from './priorities';
import { addUnitAlias } from './aliases';
// FORMATTING
addFormatToken('m', ['mm', 2, false], null, function (date, opts) {
    return getMinutes(date, opts.isUTC).toString(10);
});
// ALIASES
addUnitAlias('minute', 'm');
// PRIORITY
addUnitPriority('minute', 14);
// PARSING
addRegexToken('m', match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);
//# sourceMappingURL=minute.js.map