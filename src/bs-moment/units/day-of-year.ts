import { addFormatToken } from '../format-functions';
import { startOf } from '../utils/start-end-of';

// FORMATTING
addFormatToken('DDD', ['DDDD', 3], 'DDDo', function(date: Date): string {
  return getDayOfYear(date).toString(10);
});

export function getDayOfYear(date: Date): number {
  const date1 = +startOf(date, 'day');
  const date2 = +startOf(date, 'year');
  const someDate = date1 - date2;
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.round(someDate / oneDay) + 1;
}

export function _getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.round(diff / oneDay) + 1;
}
