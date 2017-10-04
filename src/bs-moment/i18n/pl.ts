// moment.js locale configuration
// locale : Polish [pl]
// author : Rafal Hirsz : https://github.com/evoL

import { LocaleData } from '../locale/locale.class';

const months = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split(
  '_'
);
// const monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');

function plural(n: number): boolean {
  return n % 10 < 5 && n % 10 > 1 && ~~(n / 10) % 10 !== 1;
}

function translate(num: number, withoutSuffix: boolean, key: string): string {
  const result = `${num} `;
  switch (key) {
    case 'm':
      return withoutSuffix ? 'minuta' : 'minutę';
    case 'mm':
      return result + (plural(num) ? 'minuty' : 'minut');
    case 'h':
      return withoutSuffix ? 'godzina' : 'godzinę';
    case 'hh':
      return result + (plural(num) ? 'godziny' : 'godzin');
    case 'MM':
      return result + (plural(num) ? 'miesiące' : 'miesięcy');
    case 'yy':
      return result + (plural(num) ? 'lata' : 'lat');
  }
}

export const pl: LocaleData = {
  abbr: 'pl',
  months,
  // months(date: Date, format: string): string {
  //   if (!date) {
  //     return monthsNominative;
  //   } else if (format === '') {
  //     Hack: if format empty we know this is used to generate
  //     RegExp by moment. Give then back both valid forms of months
  //     in RegExp ready format.
  // return `(${monthsSubjective[getMonth(date)]}|${monthsNominative[getMonth(date)]})`;
  // } else if (/D MMMM/.test(format)) {
  //   return monthsSubjective[getMonth(date)];
  // } else {
  //   return monthsNominative[getMonth(date)];
  // }
  // },
  monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
  weekdays: 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split(
    '_'
  ),
  weekdaysShort: 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
  weekdaysMin: 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'za %s',
    past: '%s temu',
    s: 'kilka sekund',
    m: translate,
    mm: translate,
    h: translate,
    hh: translate,
    d: '1 dzień',
    dd: '%d dni',
    M: 'miesiąc',
    MM: translate,
    y: 'rok',
    yy: translate
  },
  dayOfMonthOrdinalParse: /\d{1,2}\./,
  ordinal(num: number): string {
    return `${num}.`;
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
};
