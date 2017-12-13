import { addFormatToken } from '../format-functions';
import { startOf } from '../utils/start-end-of';
import { addRegexToken, match1to3, match3 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { toInt } from '../utils/type-checks';

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', function(date: Date): string {
  return getDayOfYear(date).toString(10);
});


// ALIASES

// addUnitAlias('dayOfYear', 'DDD');

// PRIORITY

// addUnitPriority('dayOfYear', 4);

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array) {
  // config._dayOfYear = toInt(input);
  return array;
});

export function getDayOfYear(date: Date): number {
  const date1 = +startOf(date, 'day');
  const date2 = +startOf(date, 'year');
  const someDate = date1 - date2;
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.round(someDate / oneDay) + 1;
}
