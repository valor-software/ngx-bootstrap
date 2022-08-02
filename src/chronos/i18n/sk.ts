import { LocaleData } from '../locale/locale.class';
import { getDayOfWeek } from '../units/day-of-week';

//! moment.js locale configuration
//! locale : Slovak [sk]
//! author : Jozef Pažin : https://github.com/atiris

const months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_');
const monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');

function plural(num: number): boolean {
  return (num > 1) && (num < 5) && (~~(num / 10) !== 1);
}

function translate(num: number, withoutSuffix: boolean, key: string, isFuture: boolean): string {
  const result = num + ' ';

  switch (key) {
    case 's':// a few seconds / in a few seconds / a few seconds ago
      return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
    case 'ss':// 9 seconds / in 9 seconds / 9 seconds ago
      if (withoutSuffix || isFuture) {
        return result + (plural(num) ? 'sekundy' : 'sekúnd');
      }
      else {
        return result + 'sekundami';
      }
    // break;
    case 'm':// a minute / in a minute / a minute ago
      return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
    case 'mm':// 9 minutes / in 9 minutes / 9 minutes ago
      if (withoutSuffix || isFuture) {
        return result + (plural(num) ? 'minúty' : 'minút');
      }
      else {
        return result + 'minútami';
      }
    // break;
    case 'h':// an hour / in an hour / an hour ago
      return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
    case 'hh':// 9 hours / in 9 hours / 9 hours ago
      if (withoutSuffix || isFuture) {
        return result + (plural(num) ? 'hodiny' : 'hodín');
      }
      else {
        return result + 'hodinami';
      }
    // break;
    case 'd':// a day / in a day / a day ago
      return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
    case 'dd':// 9 days / in 9 days / 9 days ago
      if (withoutSuffix || isFuture) {
        return result + (plural(num) ? 'dni' : 'dní');
      }
      else {
        return result + 'dňami';
      }
    // break;
    case 'M':// a month / in a month / a month ago
      return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
    case 'MM':// 9 months / in 9 months / 9 months ago
      if (withoutSuffix || isFuture) {
        return result + (plural(num) ? 'mesiace' : 'mesiacov');
      }
      else {
        return result + 'mesiacmi';
      }
    // break;
    case 'y':// a year / in a year / a year ago
      return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
    case 'yy':// 9 years / in 9 years / 9 years ago
      if (withoutSuffix || isFuture) {
        return result + (plural(num) ? 'roky' : 'rokov');
      }
      else {
        return result + 'rokmi';
      }
    // break;
  }
}

export const skLocale: LocaleData = {
  abbr: 'sk',
  months,
  monthsShort,
  weekdays: 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
  weekdaysShort: 'ne_po_ut_st_št_pi_so'.split('_'),
  weekdaysMin: 'ne_po_ut_st_št_pi_so'.split('_'),
  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd D. MMMM YYYY H:mm',
    l: 'D. M. YYYY'
  },
  calendar: {
    sameDay: '[dnes o] LT',
    nextDay: '[zajtra o] LT',
    nextWeek(date: Date): string {
      switch (getDayOfWeek(date)) {
        case 0:
          return '[v nedeľu o] LT';
        case 1:
        case 2:
          return '[v] dddd [o] LT';
        case 3:
          return '[v stredu o] LT';
        case 4:
          return '[vo štvrtok o] LT';
        case 5:
          return '[v piatok o] LT';
        case 6:
          return '[v sobotu o] LT';
      }
    },
    lastDay: '[včera o] LT',
    lastWeek(date: Date): string {
      switch (getDayOfWeek(date)) {
        case 0:
          return '[minulú nedeľu o] LT';
        case 1:
        case 2:
          return '[minulý] dddd [o] LT';
        case 3:
          return '[minulú stredu o] LT';
        case 4:
        case 5:
          return '[minulý] dddd [o] LT';
        case 6:
          return '[minulú sobotu o] LT';
      }
    },
    sameElse: 'L'
  },
  relativeTime: {
    future: 'o %s',
    past: 'pred %s',
    s: translate,
    ss: translate,
    m: translate,
    mm: translate,
    h: translate,
    hh: translate,
    d: translate,
    dd: translate,
    M: translate,
    MM: translate,
    y: translate,
    yy: translate
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: '%d.',
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  }
};

