import {
  DatepickerFormatOptions, YearsCalendarViewModel, YearViewModel
} from '../models/index';
import { shiftDate } from '../../bs-moment/utils/date-setters';
import { formatDate } from '../../bs-moment/format';

const height = 3;
const width = 5;
export const yearsPerCalendar = height * width;

export function formatYearsCalendar(viewDate: Date, formatOptions: DatepickerFormatOptions): YearsCalendarViewModel {

  let prevValue = viewDate;
  const yearsMatrix: YearViewModel[][] = new Array(height);
  for (let i = 0; i < height; i++) {
    yearsMatrix[i] = new Array(width);
    for (let j = 0; j < width; j++) {
      yearsMatrix[i][j] = {
        date: prevValue,
        label: formatDate(prevValue, formatOptions.yearLabel, formatOptions.locale)
      };
      prevValue = shiftDate(prevValue, {year: 1});
    }
  }

  const from = formatDate(viewDate, formatOptions.yearTitle, formatOptions.locale);
  const to = formatDate(shiftDate(prevValue, {year: -1}), formatOptions.yearTitle, formatOptions.locale);
  const yearsRangeTitle = `${from} - ${to}`;

  return {
    years: yearsMatrix,
    monthTitle: '',
    yearTitle: yearsRangeTitle
  };
}
