import {
  getDay,
  isFirstDayOfWeek
} from '../../chronos/utils/date-getters';
import { shiftDate } from '../../chronos/utils/date-setters';
import {
  isAfter,
  isBefore
} from '../../chronos/utils/date-compare';
import { endOf, startOf } from '../../chronos/utils/start-end-of';

export function getStartingDayOfCalendar(date: Date,
                                         options: { firstDayOfWeek?: number }): Date {
  if (isFirstDayOfWeek(date, options.firstDayOfWeek)) {
    return date;
  }

  const weekDay = getDay(date);
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
  const minBound = min && isBefore(endOf(date, 'month'), min, 'day');
  const maxBound = max && isAfter(startOf(date, 'month'), max, 'day');

  return minBound || maxBound;
}

export function isYearDisabled(date: Date, min: Date, max: Date): boolean {
  const minBound = min && isBefore(endOf(date, 'year'), min, 'day');
  const maxBound = max && isAfter(startOf(date, 'year'), max, 'day');

  return minBound || maxBound;
}
