import { isSameYear } from '../../chronos/utils/date-getters';
import { YearsCalendarViewModel, CalendarCellViewModel } from '../models/index';
import { isYearDisabled } from '../utils/bs-calendar-utils';
import { shiftDate } from '../../chronos/utils/date-setters';

export interface FlagYearsCalendarOptions {
  isDisabled: boolean;
  minDate: Date;
  maxDate: Date;
  hoveredYear: Date;
  displayMonths: number;
  yearIndex: number;
}

export function flagYearsCalendar(
  yearsCalendar: YearsCalendarViewModel,
  options: FlagYearsCalendarOptions
): YearsCalendarViewModel {
  yearsCalendar.years.forEach(
    (years: CalendarCellViewModel[], rowIndex: number) => {
      years.forEach((year: CalendarCellViewModel, yearIndex: number) => {
        const isHovered = isSameYear(year.date, options.hoveredYear);
        const isDisabled =
          options.isDisabled ||
          isYearDisabled(year.date, options.minDate, options.maxDate);

        const newMonth = Object.assign(/*{},*/ year, { isHovered, isDisabled });
        if (
          year.isHovered !== newMonth.isHovered ||
          year.isDisabled !== newMonth.isDisabled
        ) {
          yearsCalendar.years[rowIndex][yearIndex] = newMonth;
        }
      });
    }
  );

  // todo: add check for linked calendars
  yearsCalendar.hideLeftArrow =
    options.yearIndex > 0 && options.yearIndex !== options.displayMonths;
  yearsCalendar.hideRightArrow =
    options.yearIndex < options.displayMonths &&
    options.yearIndex + 1 !== options.displayMonths;

  yearsCalendar.disableLeftArrow = isYearDisabled(
    shiftDate(yearsCalendar.years[0][0].date, { year: -1 }),
    options.minDate,
    options.maxDate
  );
  const i = yearsCalendar.years.length - 1;
  const j = yearsCalendar.years[i].length - 1;
  yearsCalendar.disableRightArrow = isYearDisabled(
    shiftDate(yearsCalendar.years[i][j].date, { year: 1 }),
    options.minDate,
    options.maxDate
  );

  return yearsCalendar;
}
