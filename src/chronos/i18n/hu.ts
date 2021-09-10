import { LocaleData } from '../locale/locale.class';
import { getDayOfWeek } from '../units/day-of-week';

//! moment.js locale configuration
//! locale : Hungarian [hu]
//! author : Adam Brunner : https://github.com/adambrunner

let weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
function translate(num: number, withoutSuffix: boolean, key: string, isFuture: boolean): string {
  switch (key) {
    case 's':
      return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
    case 'ss':
      return num + ((isFuture || withoutSuffix) ? ' másodperc' : ' másodperce');
    case 'm':
      return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
    case 'mm':
      return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
    case 'h':
      return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
    case 'hh':
      return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
    case 'd':
      return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
    case 'dd':
      return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
    case 'M':
      return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
    case 'MM':
      return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
    case 'y':
      return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
    case 'yy':
      return num + (isFuture || withoutSuffix ? ' év' : ' éve');
  }
  return '';
}
function week(date: Date, isFuture: boolean) {
  return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[getDayOfWeek(date)] + '] LT[-kor]';
}

export const huLocale: LocaleData = {
  abbr: 'hu',
  months : 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
  monthsShort : 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
  weekdays : 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
  weekdaysShort : 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
  weekdaysMin : 'v_h_k_sze_cs_p_szo'.split('_'),
  longDateFormat : {
    LT : 'H:mm',
    LTS : 'H:mm:ss',
    L : 'YYYY.MM.DD.',
    LL : 'YYYY. MMMM D.',
    LLL : 'YYYY. MMMM D. H:mm',
    LLLL : 'YYYY. MMMM D., dddd H:mm'
  },
  meridiemParse: /de|du/i,
  isPM (input) {
    return input.charAt(1).toLowerCase() === 'u';
  },
  meridiem (hours, minutes, isLower) {
    if (hours < 12) {
      return isLower === true ? 'de' : 'DE';
    } else {
      return isLower === true ? 'du' : 'DU';
    }
  },
  calendar : {
    sameDay : '[ma] LT[-kor]',
    nextDay : '[holnap] LT[-kor]',
    nextWeek (date: Date) {
      return week(date, true);
    },
    lastDay : '[tegnap] LT[-kor]',
    lastWeek (date: Date) {
      return week(date, false);
    },
    sameElse : 'L'
  },
  relativeTime : {
    future : '%s múlva',
    past : '%s',
    s : translate,
    ss : translate,
    m : translate,
    mm : translate,
    h : translate,
    hh : translate,
    d : translate,
    dd : translate,
    M : translate,
    MM : translate,
    y : translate,
    yy : translate
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal : '%d.',
  week : {
    dow : 1, // Monday is the first day of the week.
    doy : 4  // The week that contains Jan 4th is the first week of the year.
  }
};
