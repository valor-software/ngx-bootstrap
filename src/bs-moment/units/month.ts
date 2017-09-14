import { addFormatToken } from '../format-functions';
import { isLeapYear } from './year';
import { Locale } from '../locale/locale.class';
import { mod } from '../utils';
import { getMonth } from '../utils/date-getters';

export function daysInMonth(year: number, month: number): number {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  const modMonth = mod(month, 12);
  year += (month - modMonth) / 12;

  return modMonth === 1
    ? isLeapYear(year) ? 29 : 28
    : 31 - (modMonth % 7) % 2;
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function(
  date: Date,
  format: string
): string {
  return (getMonth(date) + 1).toString();
});

addFormatToken('MMM', null, null, function(
  date: Date,
  format: string,
  locale?: Locale
): string {
  return locale.monthsShort(date, format) as string;
});

addFormatToken('MMMM', null, null, function(
  date: Date,
  format: string,
  locale?: Locale
): string {
  return locale.months(date, format) as string;
});
