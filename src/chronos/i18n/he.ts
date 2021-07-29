import { LocaleData } from '../locale/locale.class';

//! moment.js locale configuration
//! locale : Hebrew [he]
//! author : Tomer Cohen : https://github.com/tomer
//! author : Moshe Simantov : https://github.com/DevelopmentIL
//! author : Tal Ater : https://github.com/TalAter

export const heLocale: LocaleData = {
  abbr: 'he',
  months: 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
  monthsShort: 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
  weekdays: 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
  weekdaysShort: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
  weekdaysMin: 'א_ב_ג_ד_ה_ו_ש'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [ב]MMMM YYYY',
    LLL: 'D [ב]MMMM YYYY HH:mm',
    LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
    l: 'D/M/YYYY',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY HH:mm',
    llll: 'ddd, D MMM YYYY HH:mm'
  },
  calendar: {
    sameDay: '[היום ב־]LT',
    nextDay: '[מחר ב־]LT',
    nextWeek: 'dddd [בשעה] LT',
    lastDay: '[אתמול ב־]LT',
    lastWeek: '[ביום] dddd [האחרון בשעה] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'בעוד %s',
    past: 'לפני %s',
    s: 'מספר שניות',
    ss: '%d שניות',
    m: 'דקה',
    mm: '%d דקות',
    h: 'שעה',
    hh(num: number): string {
      if (num === 2) {
        return 'שעתיים';
      }
      return num + ' שעות';
    },
    d: 'יום',
    dd(num: number): string {
      if (num === 2) {
        return 'יומיים';
      }
      return num + ' ימים';
    },
    M: 'חודש',
    MM(num: number): string {
      if (num === 2) {
        return 'חודשיים';
      }
      return num + ' חודשים';
    },
    y: 'שנה',
    yy(num: number): string {
      if (num === 2) {
        return 'שנתיים';
      } else if (num % 10 === 0 && num !== 10) {
        return num + ' שנה';
      }
      return num + ' שנים';
    }
  },
  meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
  isPM(input) {
    return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
  },
  meridiem(hour, minute, isLower) {
    if (hour < 5) {
      return 'לפנות בוקר';
    } else if (hour < 10) {
      return 'בבוקר';
    } else if (hour < 12) {
      return isLower ? 'לפנה"צ' : 'לפני הצהריים';
    } else if (hour < 18) {
      return isLower ? 'אחה"צ' : 'אחרי הצהריים';
    } else {
      return 'בערב';
    }
  }
};
