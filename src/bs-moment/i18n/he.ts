// moment.js locale configuration
// locale : Hebrew (Israel) [he]
// author : Matan Sar-Shalom : https://github.com/msarsha

import { LocaleData } from '../locale/locale.class';

export const he: LocaleData = {
  abbr: 'he',
  months: 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split(
    '_'
  ),
  monthsShort: 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יונ׳_יול׳_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
  weekdays: 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split(
    '_'
  ),
  weekdaysShort: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
  weekdaysMin: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  calendar: {
    sameDay: '[היום ב] LT',
    nextDay: '[מחר ב] LT',
    nextWeek: 'dddd [ב] LT',
    lastDay: '[אתמול ב] LT',
    lastWeek: '[שבוע שעבר] dddd [ב] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'בעוד %s',
    past: '%s לפני',
    s: 'מספר שניות',
    m: 'דקה',
    mm: '%d דקות',
    h: 'שעה',
    hh: '%d שעות',
    d: 'a יום',
    dd: '%d ימים',
    M: 'a חודש',
    MM: '%d חודשים',
    y: 'a שנה',
    yy: '%d שנים'
  },
  week: {
    dow: 0, // Sunday is the first day of the week.
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
};
