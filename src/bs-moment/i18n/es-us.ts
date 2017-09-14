// moment.js locale configuration
// locale : Spanish(United State) [es-us]
// author : bustta : https://github.com/bustta

import { LocaleData } from '../locale/locale.class';

// const monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
const monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split(
  '_'
);

export const esUs: LocaleData = {
  abbr: 'es-us',
  months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
    '_'
  ),
  monthsShort,
  // monthsShort(date: Date, format: string): string {
  //   if (!date) {
  //     return monthsShortDot;
  //   } else if (/-MMM-/.test(format)) {
  //     return monthsShort[getMonth(date)];
  //   } else {
  //     return monthsShortDot[getMonth(date)];
  //   }
  // },
  monthsParseExact: true,
  weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
  weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
  weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'MM/DD/YYYY',
    LL: 'MMMM [de] D [de] YYYY',
    LLL: 'MMMM [de] D [de] YYYY H:mm',
    LLLL: 'dddd, MMMM [de] D [de] YYYY H:mm'
  },
  relativeTime: {
    future: 'en %s',
    past: 'hace %s',
    s: 'unos segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años'
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal(num: number): string {
    return `${num}º`;
  },
  week: {
    dow: 0, // Sunday is the first day of the week.
    doy: 6 // The week that contains Jan 1st is the first week of the year.
  }
};
