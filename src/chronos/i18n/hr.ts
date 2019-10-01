// tslint:disable:comment-format binary-expression-operand-order max-line-length
// tslint:disable:no-bitwise prefer-template cyclomatic-complexity
// tslint:disable:no-shadowed-variable switch-default prefer-const
// tslint:disable:one-variable-per-declaration newline-before-return

import { LocaleData } from '../locale/locale.class';

//! moment.js locale configuration
//! locale : Croatian [hr]
//! author : Danijel Grmec : https://github.com/cobaltsis

export const hrLocale: LocaleData = {
  abbr: 'hr',
  months: 'Siječanj_Veljača_Ožujak_Travanj_Svibanj_Lipanj_Srpanj_Kolovoz_Rujan_Listopad_Studeni_Prosinac'.split('_'),
  monthsShort: 'Sij_Velj_Ožu_Tra_Svi_Lip_Srp_Kol_Ruj_Lis_Stu_Pro'.split('_'),
  weekdays: 'Nedjelja_Ponedjeljak_Utorak_Srijeda_Četvrtak_Petak_Subota'.split('_'),
  weekdaysShort: 'Ned_Pon_Uto_Sri_Čet_Pet_Sub'.split('_'),
  weekdaysMin: 'Ne_Po_Ut_Sr_Če_Pe_Su'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  calendar: {
    sameDay: '[Danas u] LT',
    nextDay: '[Sutra u] LT',
    nextWeek: 'dddd [u] LT',
    lastDay: '[Jučer u] LT',
    lastWeek: '[Zadnji] dddd [u] LT',
    sameElse: 'L'
  },
  invalidDate: 'Neispravan datum',
  relativeTime: {
    future: 'za %s',
    past: '%s prije',
    s: 'nekoliko sekundi',
    ss: '%d sekundi',
    m: 'minuta',
    mm: '%d minuta',
    h: 'sat',
    hh: '%d sati',
    d: 'dan',
    dd: '%d dana',
    M: 'mjesec',
    MM: '%d mjeseci',
    y: 'godina',
    yy: '%d godina'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
  ordinal(_num: number): string {
    const num = Number(_num);
    const b = num % 10,
      output = (~~(num % 100 / 10) === 1) ? '.' :
        (b === 1) ? '.' :
          (b === 2) ? '.' :
            (b === 3) ? '.' : '.';
    return num + output;
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  }
};
