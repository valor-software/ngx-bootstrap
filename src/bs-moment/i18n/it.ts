// moment.js locale configuration
// locale : Italian [it]
// author : Lorenzo : https://github.com/aliem
// author: Mattia Larentis: https://github.com/nostalgiaz

import { LocaleData } from '../locale/locale.class';

export const it: LocaleData = {
  abbr: 'it',
  months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split(
    '_'
  ),
  monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
  weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split(
    '_'
  ),
  weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
  weekdaysMin: 'do_lu_ma_me_gi_ve_sa'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal(num: number): string {
    return `${num}º`;
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
};
