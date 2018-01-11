import { addFormatToken } from '../format/format';
import { addRegexToken, match1 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { MONTH } from './constants';
import { toInt } from '../utils/type-checks';
import { getMonth } from '../utils/date-getters';
import { DateArray, DateFormatterOptions } from '../types';
import { addUnitPriority } from './priorities';
import { addUnitAlias } from './aliases';
import { DateParsingConfig } from '../create/parsing.types';
import { setMonth } from '../utils/date-setters';

// FORMATTING

addFormatToken('Q', null, 'Qo',
  function (date: Date, opts: DateFormatterOptions): string {
    return getQuarter(date, opts.isUTC).toString(10);
  });

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input: string, array: DateArray, config: DateParsingConfig): DateParsingConfig {
  array[MONTH] = (toInt(input) - 1) * 3;

  return config;
});

// MOMENTS

export function getQuarter(date: Date, isUTC = false): number {
  return Math.ceil((getMonth(date, isUTC) + 1) / 3);
}

export function setQuarter(date: Date, quarter: number, isUTC?: boolean): Date {
  return setMonth(date, (quarter - 1) * 3 + getMonth(date, isUTC) % 3, isUTC);
}

// export function getSetQuarter(input) {
//   return input == null
//     ? Math.ceil((this.month() + 1) / 3)
//     : this.month((input - 1) * 3 + this.month() % 3);
// }
