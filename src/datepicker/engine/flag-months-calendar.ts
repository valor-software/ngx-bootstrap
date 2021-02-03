import { isSameMonth, shiftDate } from 'ngx-bootstrap/chronos';
import {
  MonthsCalendarViewModel,
  CalendarCellViewModel
} from '../models';
import { isMonthDisabled, isYearDisabled } from '../utils/bs-calendar-utils';

export interface FlagMonthCalendarOptions {
  isDisabled: boolean;
  minDate: Date;
  maxDate: Date;
  hoveredMonth: Date;
  selectedDate: Date;
  selectedRange: Date[];
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
        let isSelected: boolean;
        const isHovered = isSameMonth(month.date, options.hoveredMonth);
        const isDisabled =
          options.isDisabled ||
          isMonthDisabled(month.date, options.minDate, options.maxDate);

        if (!options.selectedDate && options.selectedRange) {
          isSelected = isSameMonth(month.date, options.selectedRange[0]);
          if (!isSelected) {
            isSelected = isSameMonth(month.date, options.selectedRange[1]);
          }
        } else {
          isSelected = isSameMonth(month.date, options.selectedDate);
        }
        const newMonth = Object.assign(/*{},*/ month, {
          isHovered,
          isDisabled,
          isSelected
        });
        if (
          month.isHovered !== newMonth.isHovered ||
          month.isDisabled !== newMonth.isDisabled ||
          month.isSelected !== newMonth.isSelected
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
