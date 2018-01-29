// tslint:disable:comment-format binary-expression-operand-order max-line-length
// tslint:disable:no-bitwise prefer-template cyclomatic-complexity
// tslint:disable:no-shadowed-variable switch-default prefer-const
// tslint:disable:one-variable-per-declaration newline-before-return

import { LocaleData } from '../locale/locale.class';
import { getHours, getMonth } from '../utils/date-getters';

//! moment.js locale configuration
//! locale : Spanish (Dominican Republic) [es-do]

let monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
  monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

let monthsParse = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i];
let monthsRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

export const esDoLocale: LocaleData = {
  abbr: 'es-do',
  months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
  monthsShort(date: Date, format: string, isUTC?: boolean): string | string[] {
    if (!date) {
      return monthsShortDot;
    } else if (/-MMM-/.test(format)) {
      return monthsShort[getMonth(date, isUTC)];
    } else {
      return monthsShortDot[getMonth(date, isUTC)];
    }
  },
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
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY h:mm A',
    LLLL: 'dddd, D [de] MMMM [de] YYYY h:mm A'
  },
  calendar: {
    sameDay(date: Date): string {
      return '[hoy a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
    },
    nextDay(date: Date): string {
      return '[mañana a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
    },
    nextWeek(date: Date): string {
      return 'dddd [a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
    },
    lastDay(date: Date): string {
      return '[ayer a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
    },
    lastWeek(date: Date): string {
      return '[el] dddd [pasado a la' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
    },
    sameElse: 'L'
  },
  relativeTime: {
    future: 'en %s',
    past: 'hace %s',
    s: 'unos segundos',
    ss: '%d segundos',
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
  ordinal: '%dº',
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  }
};
