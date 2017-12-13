import { addFormatToken } from '../format-functions';
import { getMinutes } from '../utils/date-getters';
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { MINUTE } from './constants';

// FORMATTING

addFormatToken('m', ['mm', 2], null, function (date: Date): string {
  return getMinutes(date).toString(10);
});

// ALIASES

// addUnitAlias('minute', 'm');

// PRIORITY

// addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);
