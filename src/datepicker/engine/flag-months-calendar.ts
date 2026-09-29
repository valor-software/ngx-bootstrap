import { isSameMonth, shiftDate } from 'ngx-bootstrap/chronos';
import {
  BsDatepickerViewMode,
  MonthsCalendarViewModel,
  CalendarCellViewModel
} from '../models';
import { isDisabledDate, isEnabledDate, isMonthDisabled, isYearDisabled } from '../utils/bs-calendar-utils';

export interface FlagMonthCalendarOptions {
  isDisabled: boolean;
  minDate: Date;
  maxDate: Date;
  hoveredMonth: Date;
  selectedDate: Date;
  selectedRange: Date[];
  datesDisabled: Date[];
  datesEnabled: Date[];
  displayMonths: number;
  monthIndex: number;
  minMode: BsDatepickerViewMode;
}

export function flagMonthsCalendar(
  monthCalendar: MonthsCalendarViewModel,
  options: Partial<FlagMonthCalendarOptions>
): MonthsCalendarViewModel {
  monthCalendar.months.forEach(
    (months: CalendarCellViewModel[], rowIndex: number) => {
      months.forEach((month: CalendarCellViewModel, monthIndex: number) => {
        let isSelected: boolean;
        const isHovered = isSameMonth(month.date, options.hoveredMonth);
        // a single disabled date only disables the whole month when months are what the user picks,
        // otherwise the month cell is just navigation to a day view that still has selectable days
        const isDisabled =
          options.isDisabled ||
          (options.minMode === 'month' && isDisabledDate(month.date, options.datesDisabled)) ||
          isEnabledDate(month.date, options.datesEnabled, 'month') ||
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
    !!options.monthIndex && options.monthIndex > 0 && options.monthIndex !== options.displayMonths;

  monthCalendar.hideRightArrow =
    (!!options.monthIndex || options.monthIndex === 0 )
    && (!!options.displayMonths || options.displayMonths === 0)
    && options.monthIndex < options.displayMonths
    && options.monthIndex + 1 !== options.displayMonths;

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
