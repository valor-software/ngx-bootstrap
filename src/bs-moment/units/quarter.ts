import { addFormatToken } from '../format-functions';
import { addRegexToken, match1 } from '../parse/regex';
import { addParseToken} from '../parse/token';
import { MONTH } from './constants';
import { toInt } from '../utils/type-checks';
import { getMonth } from '../utils/date-getters';
import { DateArray } from '../types';
import { addUnitPriority } from './priorities';
import { addUnitAlias } from './aliases';
import { DateParsingConfig } from '../create/parsing.types';
import { setMonth } from '../utils/date-setters';

// FORMATTING

addFormatToken('Q', null, 'Qo', getQuarter);

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

export function getQuarter(date: Date): string {
  return (Math.ceil((getMonth(date) + 1) / 3)).toString(10);
}

export function getSetQuarter(date: Date, quarter: number): Date {
  return setMonth(date, (quarter - 1) * 3 + getMonth(date) % 3);
}

// export function getSetQuarter(input) {
//   return input == null
//     ? Math.ceil((this.month() + 1) / 3)
//     : this.month((input - 1) * 3 + this.month() % 3);
// }
