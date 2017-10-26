import {
  DatepickerFormatOptions,
  DaysCalendarModel,
  DaysCalendarViewModel
} from '../models/index';
import { formatDate } from '../../bs-moment/format';
import { getLocale } from '../../bs-moment/locale/locales.service';

export function formatDaysCalendar(
  daysCalendar: DaysCalendarModel,
  formatOptions: DatepickerFormatOptions,
  monthIndex: number
): DaysCalendarViewModel {
  let weekDayArray: string[] = getLocale(formatOptions.locale).weekdaysShort() as string[];
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
    weekdays: calculateWeekdays(weekDayArray, formatOptions.startingDay),
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

/* Function for WeekDay Header Strings */
 export function calculateWeekdays(localeWeekdays: string[], startingDayOffset: number) : string[] {
  let newWeekDayArr: string[] = [];
  for (let i = 0; i<localeWeekdays.length; i++) {
    let newPos = i - startingDayOffset;
    if(newPos < 0 ) {
      newPos = newPos + 7;
    }
    newWeekDayArr[newPos] = localeWeekdays[i];    
  }
  if(newWeekDayArr && newWeekDayArr.length === 7) {
    return newWeekDayArr;
  }
  return [];
}

export function getWeekNumbers(
  daysMatrix: Date[][],
  format: string,
  locale: string
): string[] {
  return daysMatrix.map(
    (days: Date[]) => (days[0] ? formatDate(days[0], format, locale) : '')
  );
}
