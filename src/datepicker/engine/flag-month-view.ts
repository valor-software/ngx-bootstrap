import { DayViewModel, MonthViewModel, WeekViewModel } from '../models/index';
import { isSameMonth } from '../../bs-moment/utils/date-getters';

export interface FlagMonthViewOptions {
  hoveredDate: Date;
  selectedDate: Date;
  selectedRange: Date[];
  displayMonths: number;
  monthIndex: number;
}

export function flagMonthView(formattedMonth: MonthViewModel,
                              options: FlagMonthViewOptions): MonthViewModel {
  formattedMonth.weeks
    .forEach((week: WeekViewModel, weekIndex: number) => {
      week.days.forEach((day: DayViewModel, dayIndex: number) => {
        // datepicker
        const isOtherMonth = !isSameMonth(day.date, formattedMonth.month);

        const isHovered = !isOtherMonth && isSameDate(day.date, options.hoveredDate);
        // date range picker
        const isSelectionStart = !isOtherMonth && isSameDate(day.date, options.selectedRange[0]);
        const isSelectionEnd = !isOtherMonth && isSameDate(day.date, options.selectedRange[1]);

        const isSelected = !isOtherMonth && isSameDate(day.date, options.selectedDate) ||
          isSelectionStart || isSelectionEnd;

        const isInRange = !isOtherMonth && isDateInRange(day.date, options.selectedRange, options.hoveredDate);
        // decide update or not
        const newDay = Object.assign(/*{},*/ day, {
          isOtherMonth,
          isHovered,
          isSelected,
          isSelectionStart,
          isSelectionEnd,
          isInRange
        });

        if (day.isOtherMonth !== newDay.isOtherMonth ||
          day.isHovered !== newDay.isHovered ||
          day.isSelected !== newDay.isSelected ||
          day.isSelectionStart !== newDay.isSelectionStart ||
          day.isSelectionEnd !== newDay.isSelectionEnd ||
          day.isInRange !== newDay.isInRange) {
          week.days[dayIndex] = newDay;
        }
      });
    });

  // todo: add check for linked calendars
  formattedMonth.hideLeftArrow = options.monthIndex > 0
    && options.monthIndex !== options.displayMonths;
  formattedMonth.hideRightArrow = options.monthIndex < options.displayMonths
    && (options.monthIndex + 1) !== options.displayMonths;
  return formattedMonth;
}

function isSameDate(date: Date, selectedDate: Date): boolean {
  if (!date || !selectedDate) {
    return false;
  }

  return date.getFullYear() === selectedDate.getFullYear()
    && date.getMonth() === selectedDate.getMonth()
    && date.getDate() === selectedDate.getDate();
}

function isDateInRange(date: Date, selectedRange: Date[], hoveredDate: Date): boolean {
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
