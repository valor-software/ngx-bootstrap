// tslint:disable:comment-format binary-expression-operand-order max-line-length
// tslint:disable:no-bitwise prefer-template cyclomatic-complexity
// tslint:disable:no-shadowed-variable switch-default prefer-const
// tslint:disable:one-variable-per-declaration newline-before-return

import { LocaleData } from '../locale/locale.class';

//! moment.js locale configuration
//! locale : Albanian [sq]
//! author : Agon Cecelia : https://github.com/agoncecelia

export const sqLocale: LocaleData = {
  abbr: 'sq',
  months : 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
  monthsShort : 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
  weekdays : 'E Dielë_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
  weekdaysShort : 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
  weekdaysMin : 'Di_He_Ma_Me_En_Pr_Sh'.split('_'),
  longDateFormat : {
    LT : 'HH:mm',
    LTS : 'HH:mm:ss',
    L : 'DD/MM/YYYY',
    LL : 'D MMMM YYYY',
    LLL : 'D MMMM YYYY HH:mm',
    LLLL : 'dddd, D MMMM YYYY HH:mm'
  },
  calendar : {
    sameDay : '[Sot në] LT',
    nextDay : '[Nesër në] LT',
    nextWeek : 'dddd [në] LT',
    lastDay : '[Dje në] LT',
    lastWeek : 'dddd [e kaluar në] LT',
    sameElse : 'L'
  },
  relativeTime : {
    future : 'në %s',
    past : 'para %sve',
    s : 'disa sekonda',
    ss : '%d sekonda',
    m : 'një minut',
    mm : '%d minuta',
    h : 'një orë',
    hh : '%d orë',
    d : 'një ditë',
    dd : '%d ditë',
    M : 'një muaj',
    MM : '%d muaj',
    y : 'një vit',
    yy : '%d vite'
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./, // need clarification
  ordinal : '%d.', // need clarification
  week : {
    dow : 1, // Monday is the first day of the week.
    doy : 4  // The week that contains Jan 4th is the first week of the year.
  }
};

