import {
  DatepickerFormatOptions,
  DaysCalendarModel,
  DaysCalendarViewModel
} from '../models/index';
import { formatDate } from '../../chronos/format';
import { getLocale } from '../../chronos/locale/locales';

export function formatDaysCalendar(daysCalendar: DaysCalendarModel,
                                   formatOptions: DatepickerFormatOptions,
                                   monthIndex: number): DaysCalendarViewModel {
  return {
    month: daysCalendar.month,
    monthTitle: formatDate(
      daysCalendar.month,
      formatOptions.monthTitle,
      formatOptions.locale
    ),
    yearTitle: formatDate(
      daysCalendar.month,
      formatOptions.yearTitle,
      formatOptions.locale
    ),
    weekNumbers: getWeekNumbers(
      daysCalendar.daysMatrix,
      formatOptions.weekNumbers,
      formatOptions.locale
    ),
    weekdays: getShiftedWeekdays(formatOptions.locale),
    weeks: daysCalendar.daysMatrix.map((week: Date[], weekIndex: number) => ({
      days: week.map((date: Date, dayIndex: number) => ({
        date,
        label: formatDate(date, formatOptions.dayLabel, formatOptions.locale),
        monthIndex,
        weekIndex,
        dayIndex
      }))
    }))
  };
}

export function getWeekNumbers(daysMatrix: Date[][],
                               format: string,
                               locale: string): string[] {
  return daysMatrix.map(
    (days: Date[]) => (days[0] ? formatDate(days[0], format, locale) : '')
  );
}

export function getShiftedWeekdays(locale: string): string[] {
  const _locale = getLocale(locale);
  const weekdays = _locale.weekdaysShort() as string[];
  const firstDayOfWeek = _locale.firstDayOfWeek();

  return [...weekdays.slice(firstDayOfWeek), ...weekdays.slice(0, firstDayOfWeek)];
}
