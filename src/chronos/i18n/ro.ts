// tslint:disable:comment-format binary-expression-operand-order max-line-length
// tslint:disable:no-bitwise prefer-template cyclomatic-complexity
// tslint:disable:no-shadowed-variable switch-default prefer-const
// tslint:disable:one-variable-per-declaration newline-before-return
import { LocaleData } from '../locale/locale.class';

// ! moment.js locale configuration
// ! locale : Romanian [ro]
// ! author : Earle white: https://github.com/5earle

export const roLocale: LocaleData = {
  abbr: 'ro',
  months: 'Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie'.split('_'),
  monthsShort: 'Ian_Feb_Mar_Apr_Mai_Iun_Iul_Aug_Sep_Oct_Noi_Dec'.split('_'),
  weekdays: 'Duminica_Luni_Marti_Miercuri_Joi_Vineri_Sambata'.split('_'),
  weekdaysShort: 'Dum_Lun_Mar_Mie_Jo_Vin_Sam'.split('_'),
  weekdaysMin: 'Du_lu_Ma_Mi_Jo_Vi_Sa'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  calendar : {
    sameDay: '[Astazi la] LT',
    nextDay: '[Maine la] LT',
    nextWeek: 'dddd [la] LT',
    lastDay: '[Leri la] LT',
    lastWeek: '[ultimul] dddd [la] LT',
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
    MM: '%d luni',
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
