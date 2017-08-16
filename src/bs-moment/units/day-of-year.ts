import { addFormatToken } from '../format-functions';

// FORMATTING
addFormatToken('DDD', ['DDDD', 3], 'DDDo', function (date: Date): string {
  return getDayOfYear(date).toString(10);
});

export function getDayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.round(diff / oneDay);
}
