import {
  defaultLocaleMonths,
  defaultLocaleMonthsShort,
  defaultLocaleWeekdays,
  defaultLocaleWeekdaysMin,
  defaultLocaleWeekdaysShort,
  LocaleData
} from './locale.class';

export const defaultInvalidDate = 'Invalid date';

export const defaultLocaleWeek = {
  dow: 0, // Sunday is the first day of the week.
  doy: 6 // The week that contains Jan 1st is the first week of the year.
};

export const defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;

export const baseConfig: LocaleData = {
  // calendar: defaultCalendar,
  // longDateFormat: defaultLongDateFormat,
  invalidDate: defaultInvalidDate,
  // ordinal: defaultOrdinal,
  // dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
  // relativeTime: defaultRelativeTime,

  months: defaultLocaleMonths,
  monthsShort: defaultLocaleMonthsShort,

  week: defaultLocaleWeek,

  weekdays: defaultLocaleWeekdays,
  weekdaysMin: defaultLocaleWeekdaysMin,
  weekdaysShort: defaultLocaleWeekdaysShort,

  meridiemParse: defaultLocaleMeridiemParse
};
