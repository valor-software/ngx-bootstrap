import { addFormatToken } from '../format/format';
import { Locale } from '../locale/locale.class';
import { weekOfYear } from './week-calendar-utils';
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
import { addWeekParseToken } from '../parse/token';
import { toInt } from '../utils/type-checks';
import { DateFormatterOptions, WeekParsing } from '../types';
import { DateParsingConfig } from '../create/parsing.types';
import { getLocale } from '../locale/locales';
import { add } from '../moment/add-subtract';

// FORMATTING

addFormatToken('w', ['ww', 2, false], 'wo',
  function (date: Date, opts: DateFormatterOptions): string {
    return getWeek(date, opts.locale).toString(10);
  });

addFormatToken('W', ['WW', 2, false], 'Wo',
  function (date: Date): string {
    return getISOWeek(date).toString(10);
  });

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w', match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W', match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'],
  function (input: string, week: WeekParsing, config: DateParsingConfig, token: string): DateParsingConfig {
    week[token.substr(0, 1)] = toInt(input);

    return config;
  });

// export function getSetWeek (input) {
//   var week = this.localeData().week(this);
//   return input == null ? week : this.add((input - week) * 7, 'd');
// }

export function setWeek(date: Date, input: number, locale = getLocale()): Date {
  const week = getWeek(date, locale);

  return add(date, (input - week) * 7, 'day');
}

export function getWeek(date: Date, locale = getLocale()): number {
  return locale.week(date);
}

// export function getSetISOWeek (input) {
//   var week = weekOfYear(this, 1, 4).week;
//   return input == null ? week : this.add((input - week) * 7, 'd');
// }

export function setISOWeek(date: Date, input: number): Date {
  const week = getISOWeek(date);

  return add(date, (input - week) * 7, 'day');
}

export function getISOWeek(date: Date): number {
  return weekOfYear(date, 1, 4).week;
}

