import {
  defaultDayOfMonthOrdinalParse,
  defaultLocaleMonths,
  defaultLocaleMonthsShort,
  defaultLocaleWeekdays,
  defaultLocaleWeekdaysMin,
  defaultLocaleWeekdaysShort, defaultLongDateFormat, defaultOrdinal,
  LocaleData
} from './locale.class';
import { defaultCalendar } from './calendar';

export const defaultInvalidDate = 'Invalid date';

export const defaultLocaleWeek = {
  dow: 0, // Sunday is the first day of the week.
  doy: 6 // The week that contains Jan 1st is the first week of the year.
};

export const defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;

export const defaultRelativeTime: {[key: string]: string} = {
  future : 'in %s',
  past   : '%s ago',
  s  : 'a few seconds',
  ss : '%d seconds',
  m  : 'a minute',
  mm : '%d minutes',
  h  : 'an hour',
  hh : '%d hours',
  d  : 'a day',
  dd : '%d days',
  M  : 'a month',
  MM : '%d months',
  y  : 'a year',
  yy : '%d years'
};

export const baseConfig: LocaleData = {
  calendar: defaultCalendar,
  longDateFormat: defaultLongDateFormat,
  invalidDate: defaultInvalidDate,
  ordinal: defaultOrdinal,
  dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
  relativeTime: defaultRelativeTime,

  months: defaultLocaleMonths,
  monthsShort: defaultLocaleMonthsShort,

  week: defaultLocaleWeek,

  weekdays: defaultLocaleWeekdays,
  weekdaysMin: defaultLocaleWeekdaysMin,
  weekdaysShort: defaultLocaleWeekdaysShort,

  meridiemParse: defaultLocaleMeridiemParse
};
