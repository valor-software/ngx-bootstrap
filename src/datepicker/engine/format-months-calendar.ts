import {
  DatepickerFormatOptions,
  MonthsCalendarViewModel,
  CalendarCellViewModel
} from '../models/index';
import { startOf } from '../../chronos/utils/start-end-of';
import { formatDate } from '../../chronos/format';
import { createMatrix } from '../utils/matrix-utils';

const height = 4;
const width = 3;
const shift = { month: 1 };

export function formatMonthsCalendar(
  viewDate: Date,
  formatOptions: DatepickerFormatOptions
): MonthsCalendarViewModel {
  const initialDate = startOf(viewDate, 'year');
  const matrixOptions = { width, height, initialDate, shift };
  const monthMatrix = createMatrix<
    CalendarCellViewModel
  >(matrixOptions, date => ({
    date,
    label: formatDate(date, formatOptions.monthLabel, formatOptions.locale)
  }));

  return {
    months: monthMatrix,
    monthTitle: '',
    yearTitle: formatDate(
      viewDate,
      formatOptions.yearTitle,
      formatOptions.locale
    )
  };
}
