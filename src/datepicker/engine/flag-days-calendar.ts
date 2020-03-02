import {
  DaysCalendarViewModel,
  DayViewModel,
  WeekViewModel,
  DatepickerDateCustomClasses,
  DatepickerDateTooltipText
} from '../models';

import {
  isAfter,
  isBefore,
  isDisabledDay,
  isSameDay,
  isSameMonth,
  shiftDate
} from 'ngx-bootstrap/chronos';

import { isMonthDisabled, isDisabledDate, isEnabledDate } from '../utils/bs-calendar-utils';

export interface FlagDaysCalendarOptions {
  isDisabled: boolean;
  minDate: Date;
  maxDate: Date;
  daysDisabled: number[];
  datesDisabled: Date[];
  datesEnabled: Date[];
  hoveredDate: Date;
  selectedDate: Date;
  selectedRange: Date[];
  displayMonths: number;
  monthIndex: number;
  dateCustomClasses: DatepickerDateCustomClasses[];
  dateTooltipTexts: DatepickerDateTooltipText[];
}

export function flagDaysCalendar(
  formattedMonth: DaysCalendarViewModel,
  options: FlagDaysCalendarOptions
): DaysCalendarViewModel {
  formattedMonth.weeks.forEach((week: WeekViewModel) => {
    /* tslint:disable-next-line: cyclomatic-complexity */
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
        isAfter(day.date, options.maxDate, 'day') ||
        isDisabledDay(day.date, options.daysDisabled) ||
        isDisabledDate(day.date, options.datesDisabled) ||
        isEnabledDate(day.date, options.datesEnabled);

      const currentDate = new Date();
      const isToday = !isOtherMonth && isSameDay(day.date, currentDate);

      const customClasses = options.dateCustomClasses && options.dateCustomClasses
        .map(dcc => isSameDay(day.date, dcc.date) ? dcc.classes : [])
        .reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
        .join(' ')
        || '';

      const tooltipText = options.dateTooltipTexts && options.dateTooltipTexts
          .map(tt => isSameDay(day.date, tt.date) ? tt.tooltipText : '')
          .reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
          .join(' ')
        || '';

      // decide update or not
      const newDay = Object.assign({}, day, {
        isOtherMonth,
        isHovered,
        isSelected,
        isSelectionStart,
        isSelectionEnd,
        isInRange,
        isDisabled,
        isToday,
        customClasses,
        tooltipText
      });

      if (
        day.isOtherMonth !== newDay.isOtherMonth ||
        day.isHovered !== newDay.isHovered ||
        day.isSelected !== newDay.isSelected ||
        day.isSelectionStart !== newDay.isSelectionStart ||
        day.isSelectionEnd !== newDay.isSelectionEnd ||
        day.isDisabled !== newDay.isDisabled ||
        day.isInRange !== newDay.isInRange ||
        day.customClasses !== newDay.customClasses ||
        day.tooltipText !== newDay.tooltipText
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
