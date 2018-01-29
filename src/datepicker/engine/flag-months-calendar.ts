import { isSameMonth } from '../../chronos/utils/date-getters';
import {
  MonthsCalendarViewModel,
  CalendarCellViewModel
} from '../models/index';
import { isMonthDisabled, isYearDisabled } from '../utils/bs-calendar-utils';
import { shiftDate } from '../../chronos/utils/date-setters';

export interface FlagMonthCalendarOptions {
  isDisabled: boolean;
  minDate: Date;
  maxDate: Date;
  hoveredMonth: Date;
  displayMonths: number;
  monthIndex: number;
}

export function flagMonthsCalendar(
  monthCalendar: MonthsCalendarViewModel,
  options: FlagMonthCalendarOptions
): MonthsCalendarViewModel {
  monthCalendar.months.forEach(
    (months: CalendarCellViewModel[], rowIndex: number) => {
      months.forEach((month: CalendarCellViewModel, monthIndex: number) => {
        const isHovered = isSameMonth(month.date, options.hoveredMonth);
        const isDisabled =
          options.isDisabled ||
          isMonthDisabled(month.date, options.minDate, options.maxDate);
        const newMonth = Object.assign(/*{},*/ month, {
          isHovered,
          isDisabled
        });
        if (
          month.isHovered !== newMonth.isHovered ||
          month.isDisabled !== newMonth.isDisabled
        ) {
          monthCalendar.months[rowIndex][monthIndex] = newMonth;
        }
      });
    }
  );

  // todo: add check for linked calendars
  monthCalendar.hideLeftArrow =
    options.monthIndex > 0 && options.monthIndex !== options.displayMonths;
  monthCalendar.hideRightArrow =
    options.monthIndex < options.displayMonths &&
    options.monthIndex + 1 !== options.displayMonths;

  monthCalendar.disableLeftArrow = isYearDisabled(
    shiftDate(monthCalendar.months[0][0].date, { year: -1 }),
    options.minDate,
    options.maxDate
  );
  monthCalendar.disableRightArrow = isYearDisabled(
    shiftDate(monthCalendar.months[0][0].date, { year: 1 }),
    options.minDate,
    options.maxDate
  );

  return monthCalendar;
}
