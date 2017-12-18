import { addFormatToken } from '../format-functions';
import { getFullYear } from '../utils/date-getters';
import { addRegexToken, match1to2, match1to4, match1to6, match2, match4, match6, matchSigned } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { YEAR } from './constants';
import { toInt } from '../utils/type-checks';

// FORMATTING

function getYear(date: Date): string {
  return getFullYear(date).toString();
}

addFormatToken('Y', null, null, function (date: Date): string {
  const y = getFullYear(date);

  return y <= 9999 ? y.toString(10) : `+${y}`;
});

addFormatToken(null, ['YY', 2], null, function (date: Date): string {
  return (getFullYear(date) % 100).toString(10);
});

addFormatToken(null, ['YYYY', 4], null, getYear);
addFormatToken(null, ['YYYYY', 5], null, getYear);
addFormatToken(null, ['YYYYYY', 6, true], null, getYear);

// PARSING

addRegexToken('Y', matchSigned);
addRegexToken('YY', match1to2, match2);
addRegexToken('YYYY', match1to4, match4);
addRegexToken('YYYYY', match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array, config) {
  array[YEAR] = input.length === 2 ? parseTwoDigitYear(input) : toInt(input);

  return config;
});
addParseToken('YY', function (input, array, config) {
  array[YEAR] = parseTwoDigitYear(input);

  return config;
});
addParseToken('Y', function (input, array, config) {
  array[YEAR] = parseInt(input, 10);

  return config;
});

export function parseTwoDigitYear(input: string): number {
  return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
}

export function daysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
