import { addFormatToken } from '../format/format';
import { isLeapYear } from './year';
import { mod } from '../utils';
import { getMonth } from '../utils/date-getters';
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { MONTH } from './constants';
import { toInt } from '../utils/type-checks';
import { addUnitPriority } from './priorities';
import { addUnitAlias } from './aliases';
import { getParsingFlags } from '../create/parsing-flags';
import { DateParsingConfig } from '../create/parsing.types';
import { DateArray, DateFormatterOptions } from '../types';

// todo: this is duplicate, source in date-getters.ts
export function daysInMonth(year: number, month: number): number {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  const modMonth = mod(month, 12);
  const _year = year + (month - modMonth) / 12;

  return modMonth === 1
    ? isLeapYear(_year) ? 29 : 28
    : (31 - modMonth % 7 % 2);
}

// FORMATTING

addFormatToken('M', ['MM', 2, false], 'Mo',
  function (date: Date, opts: DateFormatterOptions): string {
    return (getMonth(date, opts.isUTC) + 1).toString(10);
  });

addFormatToken('MMM', null, null,
  function (date: Date, opts: DateFormatterOptions): string {
    return opts.locale.monthsShort(date, opts.format, opts.isUTC);
  });

addFormatToken('MMMM', null, null,
  function (date: Date, opts: DateFormatterOptions): string {
    return opts.locale.months(date, opts.format, opts.isUTC);
  });


// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M', match1to2);
addRegexToken('MM', match1to2, match2);
addRegexToken('MMM', function (isStrict, locale) {
  return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
  return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input: string, array: DateArray, config: DateParsingConfig): DateParsingConfig {
  array[MONTH] = toInt(input) - 1;

  return config;
});

addParseToken(['MMM', 'MMMM'],
  function (input: string, array: DateArray, config: DateParsingConfig, token: string): DateParsingConfig {
    const month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
      array[MONTH] = month;
    } else {
      getParsingFlags(config).invalidMonth = !!input;
    }

    return config;
  });

