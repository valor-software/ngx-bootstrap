import { addFormatToken } from '../format-functions';
import { Locale } from '../locale/locale.class';
import { weekOfYear } from './week-calendar-utils';
import { addRegexToken, match1to2, match2 } from '../parse/regex';

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

// addUnitAlias('week', 'w');
// addUnitAlias('isoWeek', 'W');

// PRIORITIES

// addUnitPriority('week', 5);
// addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w', match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W', match1to2);
addRegexToken('WW', match1to2, match2);

// todo: add week parse tokens
/*
addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
  week[token.substr(0, 1)] = toInt(input);
});
*/

export function getWeek(date: Date, locale: Locale): number {
  return locale.week(date);
}

export function getISOWeek(date: Date): number {
  return weekOfYear(date, 1, 4).week;
}
