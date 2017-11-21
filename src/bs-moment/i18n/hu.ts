// moment.js locale configuration
// locale : Hungarian [hu]
// author : Gergely Padányi-Gulyás : https://github.com/fegyi001

import { LocaleData } from '../locale/locale.class';

export const hu = {
  abbr: 'hu',
  months: 'Január_Február_Március_Április_Május_Június_Július_Augusztus_Szeptember_Október_November_December'.split('_'),
  monthsShort: 'Jan_Feb_Márc_Ápr_Máj_Jún_Júl_Aug_Szept_Okt_Nov_Dec'.split('_'),
  weekdays: 'Vasárnap_Hétfő_Kedd_Szerda_Csütörtök_Péntek_Szombat'.split('_'),
  weekdaysShort: 'Vas_Hét_Kedd_Sze_Csüt_Pén_Szo'.split('_'),
  weekdaysMin: 'V_H_K_Sze_Cs_P_Szo'.split('_'),
  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'YYYY.MM.DD.',
    LL: 'YYYY. MMMM D.',
    LLL: 'YYYY. MMMM D. H:mm',
    LLLL: 'YYYY. MMMM D., dddd H:mm'
  },
  calendar: {
    sameDay: '[Ma] LT[-kor]',
    nextDay: '[Holnap] LT[-kor]',
    nextWeek: 'dddd [] LT',
    lastDay: '[Tegnap] LT',
    lastWeek: '[Múlt] dddd [] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: '%s múlva',
    past: '%s',
    s: 'néhány másodperce',
    m: 'egy perce',
    mm: '%d perce',
    h: 'egy órája',
    hh: '%d órája',
    d: 'egy napja',
    dd: '%d napja',
    M: 'egy hónapja',
    MM: '%d hónapja',
    y: 'egy éve',
    yy: '%d éve'
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: '%d.',
  week: {
    dow: 1,
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
};
