// user and model input should handle parsing and validating input values
import { getFirstDayOfMonth } from 'ngx-bootstrap/chronos';
// should accept some options
// todo: split out formatting
import { DaysCalendarModel, MonthViewOptions } from '../models';
import { getStartingDayOfCalendar } from '../utils/bs-calendar-utils';
import { createMatrix, MatrixOptions } from '../utils/matrix-utils';

export function calcDaysCalendar(
  startingDate: Date,
  options: MonthViewOptions
): DaysCalendarModel {
  const firstDay = getFirstDayOfMonth(startingDate);
  const initialDate = getStartingDayOfCalendar(firstDay, options);

  // todo test
  const matrixOptions: MatrixOptions = {
    width: options.width || 0,
    height: options.height || 0,
    initialDate,
    shift: { day: 1 }
  };
  const daysMatrix = createMatrix<Date>(matrixOptions, date => date);

  return {
    daysMatrix,
    month: firstDay
  };
}
