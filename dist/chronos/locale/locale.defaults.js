import { defaultDayOfMonthOrdinalParse, defaultLocaleMonths, defaultLocaleMonthsShort, defaultLocaleWeekdays, defaultLocaleWeekdaysMin, defaultLocaleWeekdaysShort, defaultLongDateFormat, defaultOrdinal } from './locale.class';
import { defaultCalendar } from './calendar';
export var defaultInvalidDate = 'Invalid date';
export var defaultLocaleWeek = {
    dow: 0,
    doy: 6 // The week that contains Jan 1st is the first week of the year.
};
export var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
export var defaultRelativeTime = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
};
export var baseConfig = {
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
//# sourceMappingURL=locale.defaults.js.map