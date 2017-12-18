import { addFormatToken } from '../format-functions';
import { Locale } from '../locale/locale.class';
import { weekOfYear } from './week-calendar-utils';
import { addRegexToken, match1to2, match2 } from '../parse/regex';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
import { addWeekParseToken } from '../parse/token';
import { toInt } from '../utils/type-checks';
import { WeekParsing } from '../types';
import { DateParsingConfig } from '../create/parsing.types';

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', function (date: Date,
                                               format: string,
                                               locale: Locale): string {
  return getWeek(date, locale).toString(10);
});

addFormatToken('W', ['WW', 2], 'Wo', function (date: Date): string {
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

export function getWeek(date: Date, locale: Locale): number {
  return locale.week(date);
}

export function getISOWeek(date: Date): number {
  return weekOfYear(date, 1, 4).week;
}
