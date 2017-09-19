// moment.js locale configuration
// locale : Turkish [tr]
// author : Umit Gündüz : https://github.com/umitgunduz

import { LocaleData } from '../locale/locale.class';


export const tr: LocaleData = {
  abbr: 'tr',
  months: 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split(
    '_'
  ),
  monthsShort: 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
  weekdays: 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split(
    '_'
  ),
  weekdaysShort: 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
  weekdaysMin: 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  calendar: {
    sameDay: '[bugün saat] LT',
    nextDay: '[yarın saat] LT',
    nextWeek: '[haftaya] dddd [saat] LT',
    lastDay: '[dün] LT',
    lastWeek: '[geçen hafta] dddd [saat] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future : '%s sonra',
    past : '%s önce',
    s : 'birkaç saniye',
    m : 'bir dakika',
    mm : '%d dakika',
    h : 'bir saat',
    hh : '%d saat',
    d : 'bir gün',
    dd : '%d gün',
    M : 'bir ay',
    MM : '%d ay',
    y : 'bir yıl',
    yy : '%d yıl'
  },
  dayOfMonthOrdinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
  ordinal(num: number, token?: string): string {
    return `${num}.`;
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
};
