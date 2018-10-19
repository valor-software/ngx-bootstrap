import { addFormatToken } from '../format/format';
import { unix } from '../utils/date-getters';
import { addRegexToken, matchSigned, matchTimestamp } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { toInt } from '../utils/type-checks';
// FORMATTING
addFormatToken('X', null, null, function (date) {
    return unix(date).toString(10);
});
addFormatToken('x', null, null, function (date) {
    return date.valueOf().toString(10);
});
// PARSING
addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input) * 1000);
    return config;
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
    return config;
});
//# sourceMappingURL=timestamp.js.map