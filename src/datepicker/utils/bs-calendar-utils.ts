import { getDayOfWeek, isFirstDayOfWeek } from '../../bs-moment/utils/date-getters';
import { changeDate } from './date-utils';

export function getStartingDayOfCalendar(date: Date, options: {firstDayOfWeek?: number}): Date {
  if (isFirstDayOfWeek(date, options.firstDayOfWeek)) {
    return date;
  }

  const weekDay = getDayOfWeek(date);

  return changeDate(date, {day: -weekDay});
}
