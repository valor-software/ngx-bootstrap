import {
  DaysCalendarViewModel,
  DayViewModel,
  WeekViewModel
} from '../models/index';
import { isSameDay, isSameMonth } from '../../chronos/utils/date-getters';
import { isAfter, isBefore } from '../../chronos/utils/date-compare';
import { isMonthDisabled } from '../utils/bs-calendar-utils';
import { shiftDate } from '../../chronos/utils/date-setters';
import { endOf, startOf } from '../../chronos/utils/start-end-of';

export interface FlagDaysCalendarOptions {
  isDisabled: boolean;
  minDate: Date;
  maxDate: Date;
  hoveredDate: Date;
  selectedDate: Date;
  selectedRange: Date[];
  displayMonths: number;
  monthIndex: number;
}

export function flagDaysCalendar(
  formattedMonth: DaysCalendarViewModel,
  options: FlagDaysCalendarOptions
): DaysCalendarViewModel {
  formattedMonth.weeks.forEach((week: WeekViewModel, weekIndex: number) => {
    week.days.forEach((day: DayViewModel, dayIndex: number) => {
      // datepicker
      const isOtherMonth = !isSameMonth(day.date, formattedMonth.month);

      const isHovered =
        !isOtherMonth && isSameDay(day.date, options.hoveredDate);
      // date range picker
      const isSelectionStart =
        !isOtherMonth &&
        options.selectedRange &&
        isSameDay(day.date, options.selectedRange[0]);
      const isSelectionEnd =
        !isOtherMonth &&
        options.selectedRange &&
        isSameDay(day.date, options.selectedRange[1]);

      const isSelected =
        (!isOtherMonth && isSameDay(day.date, options.selectedDate)) ||
        isSelectionStart ||
        isSelectionEnd;

      const isInRange =
        !isOtherMonth &&
        options.selectedRange &&
        isDateInRange(day.date, options.selectedRange, options.hoveredDate);

      const isDisabled =
        options.isDisabled ||
        isBefore(day.date, options.minDate, 'day') ||
        isAfter(day.date, options.maxDate, 'day');

      // decide update or not
      const newDay = Object.assign({}, day, {
        isOtherMonth,
        isHovered,
        isSelected,
        isSelectionStart,
        isSelectionEnd,
        isInRange,
        isDisabled
      });

      if (
        day.isOtherMonth !== newDay.isOtherMonth ||
        day.isHovered !== newDay.isHovered ||
        day.isSelected !== newDay.isSelected ||
        day.isSelectionStart !== newDay.isSelectionStart ||
        day.isSelectionEnd !== newDay.isSelectionEnd ||
        day.isDisabled !== newDay.isDisabled ||
        day.isInRange !== newDay.isInRange
      ) {
        week.days[dayIndex] = newDay;
      }
    });
  });

  // todo: add check for linked calendars
  formattedMonth.hideLeftArrow =
    options.isDisabled ||
    (options.monthIndex > 0 && options.monthIndex !== options.displayMonths);
  formattedMonth.hideRightArrow =
    options.isDisabled ||
    (options.monthIndex < options.displayMonths &&
      options.monthIndex + 1 !== options.displayMonths);

  formattedMonth.disableLeftArrow = isMonthDisabled(
    shiftDate(formattedMonth.month, { month: -1 }),
    options.minDate,
    options.maxDate
  );
  formattedMonth.disableRightArrow = isMonthDisabled(
    shiftDate(formattedMonth.month, { month: 1 }),
    options.minDate,
    options.maxDate
  );

  return formattedMonth;
}

function isDateInRange(
  date: Date,
  selectedRange: Date[],
  hoveredDate: Date
): boolean {
  if (!date || !selectedRange[0]) {
    return false;
  }

  if (selectedRange[1]) {
    return date > selectedRange[0] && date <= selectedRange[1];
  }

  if (hoveredDate) {
    return date > selectedRange[0] && date <= hoveredDate;
  }

  return false;
}
