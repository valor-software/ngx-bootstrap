import { addFormatToken } from '../format/format';
import { startOf } from '../utils/start-end-of';
import { addRegexToken, match1to3, match3 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { addUnitPriority } from './priorities';
import { addUnitAlias } from './aliases';
import { DateArray, DateFormatterOptions } from '../types';
import { DateParsingConfig } from '../create/parsing.types';
import { toInt } from '../utils/type-checks';
import { add } from '../moment/add-subtract';

// FORMATTING

addFormatToken('DDD', ['DDDD', 3, false], 'DDDo',
  function (date: Date): string {
    return getDayOfYear(date).toString(10);
  });


// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY

addUnitPriority('dayOfYear', 4);

addRegexToken('DDD', match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'],
  function (input: string, array: DateArray, config: DateParsingConfig): DateParsingConfig {
    config._dayOfYear = toInt(input);

    return config;
  });

export function getDayOfYear(date: Date): number {
  const date1 = +startOf(date, 'day');
  const date2 = +startOf(date, 'year');
  const someDate = date1 - date2;
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.round(someDate / oneDay) + 1;
}

export function setDayOfYear(date: Date, input: number): Date {
  const dayOfYear = getDayOfYear(date);

  return add(date, (input - dayOfYear), 'day');
}
