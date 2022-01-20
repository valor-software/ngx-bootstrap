import { LocaleData } from '../locale/locale.class';

//! moment.js locale configuration
//! locale : Latvian [lv]
//! author : Matiss Janis Aboltins : https://github.com/matissjanis

export const lvLocale: LocaleData = {
  abbr: 'lv',
  months : 'Janvāris_Februāris_Marts_Aprīlis_Maijs_Jūnijs_Jūlijs_Augusts_Septembris_Oktobris_Novembris_Decembris'.split('_'),
  monthsShort : 'Jan_Feb_Mar_Apr_Mai_Jūn_Jūl_Aug_Sep_Okt_Nov_Dec'.split('_'),
  weekdays : 'Svētdiena_Pirmdiena_Otrdiena_Trešdiena_Ceturtdiena_Piektdiena_Sestdiena'.split('_'),
  weekdaysShort : 'Svētd_Pirmd_Otrd_Trešd_Ceturtd_Piektd_Sestd'.split('_'),
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
    ss : '%d sekundēm',
    m : 'minūtes',
    mm : '%d minūtēm',
    h : 'stundas',
    hh : '%d stundām',
    d : 'dienas',
    dd : '%d dienām',
    M : 'mēneša',
    MM : '%d mēnešiem',
    y : 'gada',
    yy : '%d gadiem'
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal(num) {
      return num + '.';
  },
  week : {
    dow : 1, // Monday is the first day of the week.
    doy : 4  // The week that contains Jan 4th is the first week of the year.
  }
};
