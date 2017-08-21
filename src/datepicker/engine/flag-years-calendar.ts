import { MonthsCalendarViewModel, MonthViewModel, YearsCalendarViewModel, YearViewModel } from '../models/index';
import { isSameMonth, isSameYear } from '../../bs-moment/utils/date-getters';

export interface FlagYearsCalendarOptions {
  hoveredYear: Date;
  displayMonths: number;
  yearIndex: number;
}

export function flagYearsCalendar(yearsCalendar: YearsCalendarViewModel, options: FlagYearsCalendarOptions): YearsCalendarViewModel {
  yearsCalendar.years
    .forEach((years: YearViewModel[], rowIndex: number) => {
      years.forEach((year: YearViewModel, yearIndex: number) => {
        const isHovered = isSameYear(year.date, options.hoveredYear);
        const newMonth = Object.assign(/*{},*/ year, {isHovered});
        if (year.isHovered !== newMonth.isHovered) {
          yearsCalendar.years[rowIndex][yearIndex] = newMonth;
        }
      });
    });

  // todo: add check for linked calendars
  yearsCalendar.hideLeftArrow = options.yearIndex > 0
    && options.yearIndex !== options.displayMonths;
  yearsCalendar.hideRightArrow = options.yearIndex < options.displayMonths
    && (options.yearIndex + 1) !== options.displayMonths;

  return yearsCalendar;
}
