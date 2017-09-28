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

export function getStartingDayOfCalendar(
  date: Date,
  options: { firstDayOfWeek?: number }
): Date {
  if (isFirstDayOfWeek(date, options.firstDayOfWeek)) {
    return date;
  }

  const weekDay = getDayOfWeek(date);

  return shiftDate(date, { day: -weekDay });
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
