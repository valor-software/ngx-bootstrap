// user and model input should handle parsing and validating input values
// should accept some options
// todo: split out formatting
import { DaysCalendarModel, MonthViewOptions } from '../models/index';
import { getFirstDayOfMonth } from '../../bs-moment/utils/date-getters';
import { getStartingDayOfCalendar } from '../utils/bs-calendar-utils';
import { shiftDate } from '../../bs-moment/utils/date-setters';

export function calcDaysCalendar(date: Date, options: MonthViewOptions): DaysCalendarModel {
  const firstDay = getFirstDayOfMonth(date);

  let prevValue = getStartingDayOfCalendar(firstDay, options);
  const daysCalendar = new Array(options.height);
  for (let i = 0; i < options.height; i++) {
    daysCalendar[i] = new Array(options.width);
    for (let j = 0; j < options.width; j++) {
      daysCalendar[i][j] = prevValue;
      prevValue = shiftDate(prevValue, {day: 1});
    }
  }

  return {
    daysMatrix: daysCalendar,
    month: firstDay
  };
}
