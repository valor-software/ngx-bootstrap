import { LocaleData } from '../locale/locale.class';
import { getHours, getMonth } from '../utils/date-getters';

//! moment.js locale configuration
//! locale : Galician [gl]
//! author : Darío Beiró : https://github.com/quinobravo

let monthsShortDot = 'xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.'.split('_'),
  monthsShort = 'xan_feb_mar_abr_mai_xuñ_xul_ago_set_out_nov_dec'.split('_');

let monthsParse = [/^xan/i, /^feb/i, /^mar/i, /^abr/i, /^mai/i, /^xuñ/i, /^xul/i, /^ago/i, /^set/i, /^out/i, /^nov/i, /^dec/i];
let monthsRegex = /^(xaneiro|febreiro|marzo|abril|maio|xuño|xullo|agosto|setembro|outubro|novembro|decembro|xan\.?|feb\.?|mar\.?|abr\.?|mai\.?|xuñ\.?|xul\.?|ago\.?|set\.?|out\.?|nov\.?|dec\.?)/i;

export const glLocale: LocaleData = {
  abbr: 'gl',
  months: 'xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
  monthsShort(date: Date, format: string, isUTC?: boolean): string | string[] {
    if (!date) {
      return monthsShortDot;
    }

    if (/-MMM-/.test(format)) {
      return monthsShort[getMonth(date, isUTC)];
    }

    return monthsShortDot[getMonth(date, isUTC)];
  },
  monthsRegex,
  monthsShortRegex: monthsRegex,
  monthsStrictRegex: /^(xaneiro|febreiro|marzo|abril|maio|xuño|xullo|agosto|setembro|outubro|novembro|decembro)/i,
  monthsShortStrictRegex: /^(xan\.?|feb\.?|mar\.?|abr\.?|mai\.?|xuñ\.?|xul\.?|ago\.?|set\.?|out\.?|nov\.?|dec\.?)/i,
  monthsParse,
  longMonthsParse: monthsParse,
  shortMonthsParse: monthsParse,
  weekdays: 'domingo_luns_martes_mércores_xoves_venres_sábado'.split('_'),
  weekdaysShort: 'dom._lun._mar._mér._xov._ven._sáb.'.split('_'),
  weekdaysMin: 'do_lu_ma_mé_xo_ve_sá'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY H:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm'
  },
  calendar: {
    sameDay(date: Date) {
      return '[hoxe á' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
    },
    nextDay(date: Date) {
      return '[mañan á' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
    },
    nextWeek(date: Date) {
      return 'dddd [á' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
    },
    lastDay(date: Date) {
      return '[onte á' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
    },
    lastWeek(date: Date) {
      return '[o] dddd [pasado á' + ((getHours(date) !== 1) ? 's' : '') + '] LT';
    },
    sameElse: 'L'
  },
  relativeTime: {
    future: 'en %s',
    past: 'fai %s',
    s: 'uns segundos',
    ss: '%d segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'unha hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un ano',
    yy: '%d anos'
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: '%dº',
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  }
};
