// user and model input should handle parsing and validating input values
// should accept some options
// todo: split out formatting
import { DaysCalendarModel, MonthViewOptions } from '../models/index';
import { getFirstDayOfMonth } from '../../chronos/utils/date-getters';
import { getStartingDayOfCalendar } from '../utils/bs-calendar-utils';
import { createMatrix } from '../utils/matrix-utils';

export function calcDaysCalendar(
  startingDate: Date,
  options: MonthViewOptions
): DaysCalendarModel {
  const firstDay = getFirstDayOfMonth(startingDate);
  const initialDate = getStartingDayOfCalendar(firstDay, options);

  const matrixOptions = {
    width: options.width,
    height: options.height,
    initialDate,
    shift: { day: 1 }
  };
  const daysMatrix = createMatrix<Date>(matrixOptions, date => date);

  return {
    daysMatrix,
    month: firstDay
  };
}
