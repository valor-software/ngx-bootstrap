import { LocaleData } from '../locale/locale.class';
import { getHours, getMonth } from '../utils/date-getters';

//! moment.js locale configuration
//! locale : Catalan [ca]
//! author : Xavier Arbat : https://github.com/XavisaurusRex

let monthsShortDot = 'gen._feb._mar._abr._mai._jun._jul._ago._set._oct._nov._des.'.split('_'),
  monthsShort = 'ene_feb_mar_abr_mai_jun_jul_ago_set_oct_nov_des'.split('_');

let monthsParse = [/^gen/i, /^feb/i, /^mar/i, /^abr/i, /^mai/i, /^jun/i, /^jul/i, /^ago/i, /^set/i, /^oct/i, /^nov/i, /^des/i];
let monthsRegex = /^(gener|febrer|març|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre|gen\.?|feb\.?|mar\.?|abr\.?|mai\.?|jun\.?|jul\.?|ago\.?|set\.?|oct\.?|nov\.?|des\.?)/i;

export const caLocale: LocaleData = {
  abbr: 'ca',
  months: 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
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
  monthsStrictRegex: /^(gener|febrer|març|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre)/i,
  monthsShortStrictRegex: /^(gen\.?|feb\.?|mar\.?|abr\.?|mai\.?|jun\.?|jul\.?|ago\.?|set\.?|oct\.?|nov\.?|des\.?)/i,
  monthsParse,
  longMonthsParse: monthsParse,
  shortMonthsParse: monthsParse,
  weekdays: 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
  weekdaysShort: 'diu._dil._dim._dix._dij._div._dis.'.split('_'),
  weekdaysMin: 'dg_dl_dt_dc_dj_dv_ds'.split('_'),
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
      return '[avui a ' + ('la' + (getHours(date) !== 1) ? 'les' : '') + '] LT';
    },
    nextDay(date: Date) {
      return '[dema a ' + ('la' + (getHours(date) !== 1) ? 'les' : '') + '] LT';
    },
    nextWeek(date: Date) {
      return 'dddd [a ' + ('la' + (getHours(date) !== 1) ? 'les' : '') + '] LT';
    },
    lastDay(date: Date) {
      return '[ahir a ' + ('la' + (getHours(date) !== 1) ? 'les' : '') + '] LT';
    },
    lastWeek(date: Date) {
      return '[el] dddd [' + ('passada la ' + (getHours(date) !== 1) ? 'passades les' : '') + '] LT';
    },
    sameElse: 'L'
  },
  relativeTime: {
    future: 'en %s',
    past: 'fa %s',
    s: 'uns segons',
    ss: '%d segons',
    m: 'un minut',
    mm: '%d minuts',
    h: 'una hora',
    hh: '%d hores',
    d: 'un dia',
    dd: '%d dies',
    M: 'un mes',
    MM: '%d mesos',
    y: 'un any',
    yy: '%d anys'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|on|er|rt|é)/,
  ordinal(_num: number): string {
    const num = Number(_num);
    const output = (num > 4) ? 'é' :
        (num === 1 || num === 3) ? 'r' :
          (num === 2) ? 'n' :
            (num === 4) ? 't' : 'é';
    return num + output;
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  }
};
