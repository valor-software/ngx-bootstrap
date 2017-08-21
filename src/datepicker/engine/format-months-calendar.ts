import {
  DatepickerFormatOptions, MonthsCalendarViewModel, MonthViewModel
} from '../models/index';
import { startOf } from '../../bs-moment/utils/start-end-of';
import { shiftDate } from '../../bs-moment/utils/date-setters';
import { formatDate } from '../../bs-moment/format';

export function formatMonthsCalendar(viewDate: Date, formatOptions: DatepickerFormatOptions): MonthsCalendarViewModel {
  const height = 4;
  const width = 3;

  let prevValue = startOf(viewDate, 'year');
  const monthMatrix: MonthViewModel[][] = new Array(height);
  for (let i = 0; i < height; i++) {
    monthMatrix[i] = new Array(width);
    for (let j = 0; j < width; j++) {
      monthMatrix[i][j] = {
        date: prevValue,
        label: formatDate(prevValue, formatOptions.monthLabel, formatOptions.locale)
      };
      prevValue = shiftDate(prevValue, {month: 1});
    }
  }

  return {
    months: monthMatrix,
    monthTitle: '',
    yearTitle: formatDate(prevValue, formatOptions.yearTitle, formatOptions.locale)
  };
}
