import {
  getDayOfWeek,
  isFirstDayOfWeek
} from '../../bs-moment/utils/date-getters';
import { shiftDate } from '../../bs-moment/utils/date-setters';
import {
  isSameOrAfter,
  isSameOrBefore
} from '../../bs-moment/utils/date-compare';
import { endOf, startOf } from '../../bs-moment/utils/start-end-of';

export function getStartingDayOfCalendar(date: Date,
                                         options: { firstDayOfWeek?: number }): Date {
  if (isFirstDayOfWeek(date, options.firstDayOfWeek)) {
    return date;
  }

  const weekDay = getDayOfWeek(date);
  const offset = calculateDateOffset(weekDay, options.firstDayOfWeek);

  return shiftDate(date, {day: -offset});
}

export function calculateDateOffset(weekday: number, startingDayOffset: number): number {
  if (startingDayOffset === 0) {
    return weekday;
  }

  const offset = weekday - startingDayOffset % 7;

  return offset < 0 ? offset + 7 : offset;
}

export function isMonthDisabled(date: Date, min: Date, max: Date): boolean {
  const minBound = min && isSameOrBefore(endOf(date, 'month'), min, 'day');
  const maxBound = max && isSameOrAfter(startOf(date, 'month'), max, 'day');

  return minBound || maxBound;
}

export function isYearDisabled(date: Date, min: Date, max: Date): boolean {
  const minBound = min && isSameOrBefore(endOf(date, 'year'), min, 'day');
  const maxBound = max && isSameOrAfter(startOf(date, 'year'), max, 'day');

  return minBound || maxBound;
}
