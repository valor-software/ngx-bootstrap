import { addFormatToken } from '../format/format';
import { getSeconds } from '../utils/date-getters';
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { SECOND } from './constants';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
// FORMATTING
addFormatToken('s', ['ss', 2, false], null, function (date, opts) {
    return getSeconds(date, opts.isUTC).toString(10);
});
// ALIASES
addUnitAlias('second', 's');
// PRIORITY
addUnitPriority('second', 15);
// PARSING
addRegexToken('s', match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);
//# sourceMappingURL=second.js.map