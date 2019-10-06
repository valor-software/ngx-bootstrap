// tslint:disable:comment-format binary-expression-operand-order max-line-length
// tslint:disable:no-bitwise prefer-template cyclomatic-complexity
// tslint:disable:no-shadowed-variable switch-default prefer-const
// tslint:disable:one-variable-per-declaration newline-before-return

import { LocaleData } from '../locale/locale.class';

//! moment.js locale configuration
//! locale : English (United Kingdom) [en-gb]
//! author : Chris Gedrim : https://github.com/chrisgedrim

export const enGbLocale: LocaleData = {
  abbr: 'lv',
  months : 'Janvāris_Februāris_Marts_Aprīlis_Maijs_Jūnijs_Jūlijs_Augusts_Septembris_Oktobris_Novembris_Decembris'.split('_'),
  monthsShort : 'Jan_Feb_Mar_Apr_Mai_Jūn_Jūl_Aug_Sep_Okt_Nov_Dec'.split('_'),
  weekdays : 'Svētdiena_Pirmdiena_Otrdiena_Trešdiena_Ceturtdiena_Piektdiena_Sestdiena'.split('_'),
  weekdaysShort : 'Svētd_Pirmd_Otrd_Trešd_Ceturd_Piektd_Sestd'.split('_'),
  weekdaysMin : 'Sv_Pi_Ot_Tr_Ce_Pk_Se'.split('_'),
  longDateFormat : {
    LT : 'HH:mm',
    LTS : 'HH:mm:ss',
    L : 'DD/MM/YYYY',
    LL : 'D MMMM YYYY',
    LLL : 'D MMMM YYYY HH:mm',
    LLLL : 'dddd, D MMMM YYYY HH:mm'
  },
  calendar : {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
  },
  relativeTime : {
    future : 'pēc %s',
    past : 'pirms %s',
    s : 'dažām sekundēm',
    ss : '%d sekundes',
    m : 'a minūte',
    mm : '%d minūtes',
    h : 'stunda',
    hh : '%d stundas',
    d : 'diena',
    dd : '%d dienas',
    M : 'mēnesis',
    MM : '%d mēneši',
    y : 'gads',
    yy : '%d gada'
  },
  week : {
    dow : 1, // Monday is the first day of the week.
    doy : 4  // The week that contains Jan 4th is the first week of the year.
  }
};
