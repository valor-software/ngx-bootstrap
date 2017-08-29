import { getDayOfWeek, isFirstDayOfWeek } from '../../bs-moment/utils/date-getters';
import { shiftDate } from '../../bs-moment/utils/date-setters';

export function getStartingDayOfCalendar(date: Date, options: {firstDayOfWeek?: number}): Date {
  if (isFirstDayOfWeek(date, options.firstDayOfWeek)) {
    return date;
  }

  const weekDay = getDayOfWeek(date);

  return shiftDate(date, {day: -weekDay});
}
