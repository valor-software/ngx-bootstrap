// moment.js locale configuration
// locale : Spanish [es]
// author : Julio Napurí : https://github.com/julionc

import { LocaleData } from '../locale/locale.class';

// const monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
const monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split(
  '_'
);

const monthsParse = [
  /^ene/i,
  /^feb/i,
  /^mar/i,
  /^abr/i,
  /^may/i,
  /^jun/i,
  /^jul/i,
  /^ago/i,
  /^sep/i,
  /^oct/i,
  /^nov/i,
  /^dic/i
];
// tslint:disable-next-line
const monthsRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

export const es: LocaleData = {
  abbr: 'es',
  months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
    '_'
  ),
  // monthsShort(date: Date, format: string): string {
  //   if (!date) {
  //     return monthsShortDot;
  //   } else if (/-MMM-/.test(format)) {
  //     return monthsShort[getMonth(date)];
  //   } else {
  //     return monthsShortDot[getMonth(date)];
  //   }
  // },
  monthsShort,
  monthsRegex,
  monthsShortRegex: monthsRegex,
  monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
  monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
  monthsParse,
  longMonthsParse: monthsParse,
  shortMonthsParse: monthsParse,
  weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
  weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
  weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY H:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
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
    dow: 1, // Monday is the first day of the week.
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
};
