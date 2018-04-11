import { LocaleData } from '../locale/locale.class';

// ! moment.js locale configuration
// ! locale : Romanian [ro]
// ! author : Earle white: https://github.com/5earle

export const roLocale: LocaleData = {
  abbr: 'ro',
  months: 'Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie'.split('_'),
  monthsShort: 'Ian_Feb_Mar_Apr_Ma_Iun,Iul,Aug,Sep,Oct,Noi,Dec'.split('_'),
  weekdays: 'Duminică_Luni_Marţi_Miercuri_Joi_Vineri_Sâmbătă'.split('_'),
  weekdaysShort: 'Dum_Lun_Mar_Mie_Jo_Vin_Sâm'.split('_'),
  weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  calendar : {
    sameDay: '[Astăzi la] LT',
    nextDay: '[Mâine la] LT',
    nextWeek: 'dddd [la] LT',
    lastDay: '[Leri la] LT',
    lastWeek: '[ultimul] dddd [la] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'în %s',
    past: '%s în urmă',
    s: 'câteva secunde',
    ss: '%d secunde',
    m: 'un minut',
    mm: '%d minute',
    h: 'o ora',
    hh: '%d ore',
    d: 'o zi',
    dd: '%d zi',
    M: 'o luna',
    MM: '%d lună',
    y: 'un an',
    yy: '% an'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
  ordinal(_num: number): string {
    const num = Number(_num);
    const b = num % 10,
      output = (~~(num % 100 / 10) === 1) ? 'th' :
        (b === 1) ? 'st' :
          (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
    return num + output;
  },
  week : {
    dow : 1, // Monday is the first day of the week.
    doy : 4  // The week that contains Jan 4th is the first week of the year.
  }
};
