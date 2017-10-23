import { addFormatToken } from '../format-functions';
import { Locale } from '../locale/locale.class';
import { weekOfYear } from './week-calendar-utils';

addFormatToken('w', ['ww', 2], 'wo', function(
  date: Date,
  format: string,
  locale: Locale
): string {
  return getWeek(date, locale).toString(10);
});
addFormatToken('W', ['WW', 2], 'Wo', function(date: Date): string {
  return getISOWeek(date).toString(10);
});

export function getWeek(date: Date, locale: Locale): number {
  return locale.week(date);
}

export function getISOWeek(date: Date): number {
  return weekOfYear(date, 1, 4).week;
}
