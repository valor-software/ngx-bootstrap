import { addFormatToken } from '../format/format';
import { unix } from '../utils/date-getters';
import { addRegexToken, matchSigned, matchTimestamp } from '../parse/regex';
import { addParseToken} from '../parse/token';
import { toInt } from '../utils/type-checks';
import { DateArray } from '../types';
import { DateParsingConfig } from '../create/parsing.types';

// FORMATTING

addFormatToken('X', null, null, function (date: Date): string {
  return unix(date).toString(10);
});
addFormatToken('x', null, null, function (date: Date): string {
  return date.valueOf().toString(10);
});

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);

addParseToken('X', function (input: string, array: DateArray, config: DateParsingConfig): DateParsingConfig {
  config._d = new Date(parseFloat(input) * 1000);

  return config;
});
addParseToken('x', function (input: string, array: DateArray, config: DateParsingConfig): DateParsingConfig {
  config._d = new Date(toInt(input));

  return config;
});
