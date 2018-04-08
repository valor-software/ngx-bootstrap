import { LocaleData } from '../locale/locale.class';

// ! moment.js locale configuration
// ! locale : Romanian [ro]
// ! author : Earle white: https://github.com/5earle

export const roLocale: LocaleData = {
  abbr: 'ro',
  months: 'Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie'.split('_'),
  monthsShort: 'Ian_Feb_Mar_Apr_Ma_Iun,Iul,Aug,Sep,Oct,Noi,Dec'.split('_'),
  weekdays: 'Duminică_Luni_Marţi_Miercuri_Joi_Vineri_Sâmbătă'.split('_'),
  weekdaysShort: 'dum_lun_mar_mie_jo_vin_sam'.split('_'),
  weekdaysMin: 'du_lu_ma_mi_jo_vi_sa'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  calendar : {
    sameDay: '[astăzi la] LT',
    nextDay: '[Mâine la] LT',
    nextWeek: 'dddd [la] LT',
    lastDay: '[Ieri la] LT',
    lastWeek: 'dddd [ultima pentru] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'despre %s',
    past: 'există %s',
    s: 'câteva secunde',
    ss: '%d secunde',
    m: 'un minut',
    mm: '%d minute',
    h: 'o ora',
    hh: '%d ore',
    d: 'intr-o zi',
    dd: '%d zi',
    M: 'o luna',
    MM: '%d lună',
    y: 'un an',
    yy: 'ani'
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal: '%d',
  week: {
    dow: 1,
    doy: 4
  }
};
