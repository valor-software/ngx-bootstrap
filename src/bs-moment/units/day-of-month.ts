import { addFormatToken } from '../format-functions';
import { getDate } from '../utils/date-getters';
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addParseToken, DateArray } from '../parse/token';
import { DATE } from './constants';
import { toInt } from '../utils/type-checks';

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', function (date: Date): string {
  return getDate(date).toString(10);
});

// ALIASES

// addUnitAlias('date', 'D');

// PRIOROITY
// addUnitPriority('date', 9);

// PARSING

addRegexToken('D', match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
  // TODO: Remove "ordinalParse" fallback in next major release.
  return isStrict ?
    (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
    locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input: string, array: DateArray): DateArray {
  array[DATE] = toInt(input.match(match1to2)[0]);

  return array;
});
