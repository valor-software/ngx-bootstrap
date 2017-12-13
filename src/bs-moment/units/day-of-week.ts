import { addFormatToken } from '../format-functions';
import { Locale } from '../locale/locale.class';
import { getDayOfWeek } from '../utils/date-getters';
import { addRegexToken, match1to2 } from '../parse/regex';

// FORMATTING

addFormatToken('d', null, 'do', function(date: Date): string {
  return getDayOfWeek(date).toString(10);
});

addFormatToken('dd', null, null, function(
  date: Date,
  format: string,
  locale?: Locale
): string {
  return locale.weekdaysShort(date) as string;
});

addFormatToken('ddd', null, null, function(
  date: Date,
  format: string,
  locale?: Locale
): string {
  return locale.weekdaysMin(date) as string;
});

addFormatToken('dddd', null, null, function(
  date: Date,
  format: string,
  locale?: Locale
): string {
  return locale.weekdays(date, format) as string;
});

addFormatToken('e', null, null, function(date: Date): string {
  return getDayOfWeek(date).toString(10);
});
addFormatToken('E', null, null, function(date: Date): string {
  return getISODayOfWeek(date).toString(10);
});

// ALIASES

// addUnitAlias('day', 'd');
// addUnitAlias('weekday', 'e');
// addUnitAlias('isoWeekday', 'E');

// PRIORITY
// addUnitPriority('day', 11);
// addUnitPriority('weekday', 11);
// addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict: boolean, locale: Locale): RegExp {
  return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
  return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
  return locale.weekdaysRegex(isStrict);
});

/*
addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, locale, token): string {
  const _strict = false;
  const weekday = locale.weekdaysParse(input, token, _strict);
  // if we didn't get a weekday name, mark the date as invalid
  if (weekday != null) {
    // week.d = weekday;
    return weekday;
  }
  // else {
  //   getParsingFlags(config).invalidWeekday = input;
  // }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
  week[token] = toInt(input);
});
*/

export function getLocaleDayOfWeek(date: Date, locale: Locale): number {
  return (getDayOfWeek(date) + 7 - locale.firstDayOfWeek()) % 7;
}

export function getISODayOfWeek(date: Date): number {
  return getDayOfWeek(date) || 7;
}

// todo: a lot of week helpers
