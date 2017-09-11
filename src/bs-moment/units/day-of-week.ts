import { addFormatToken } from '../format-functions';
import { Locale } from '../locale/locale.class';
import { getDayOfWeek } from '../utils/date-getters';

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

export function getLocaleDayOfWeek(date: Date, locale: Locale): number {
  return (getDayOfWeek(date) + 7 - locale.firstDayOfWeek()) % 7;
}

export function getISODayOfWeek(date: Date): number {
  return getDayOfWeek(date) || 7;
}
