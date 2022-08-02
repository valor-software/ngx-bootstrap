import { LocaleData } from '../locale/locale.class';

//! moment.js locale configuration
//! locale : Lithuanian [lt]
//! author : Stanislavas Guk : https://github.com/ixoster

const units = {
  ss : 'sekundė_sekundžių_sekundes',
  m : 'minutė_minutės_minutę',
  mm: 'minutės_minučių_minutes',
  h : 'valanda_valandos_valandą',
  hh: 'valandos_valandų_valandas',
  d : 'diena_dienos_dieną',
  dd: 'dienos_dienų_dienas',
  M : 'mėnuo_mėnesio_mėnesį',
  MM: 'mėnesiai_mėnesių_mėnesius',
  y : 'metai_metų_metus',
  yy: 'metai_metų_metus'
};
function translateSeconds(num: number, withoutSuffix: boolean, key: string, isFuture: boolean) {
  if (withoutSuffix) {
      return 'kelios sekundės';
  } else {
      return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
  }
}
function translateSingular(num: number, withoutSuffix: boolean, key: string, isFuture: boolean) {
  return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
}
function special(num: number) {
  return num % 10 === 0 || (num > 10 && num < 20);
}
function forms(key: string) {
  return (units as any)[key].split('_');
}
function translate(num: number, withoutSuffix: boolean, key: string, isFuture: boolean) {
  let result = num + ' ';
  if (num === 1) {
      return result + translateSingular(num, withoutSuffix, key[0], isFuture);
  } else if (withoutSuffix) {
      return result + (special(num) ? forms(key)[1] : forms(key)[0]);
  } else {
      if (isFuture) {
          return result + forms(key)[1];
      } else {
          return result + (special(num) ? forms(key)[1] : forms(key)[2]);
      }
  }
}

export const ltLocale: LocaleData = {
  abbr: 'lt',
  months : {
    format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
    standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_'),
    isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
  },
  monthsShort : 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
  weekdays : {
      format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
      standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
      isFormat: /dddd HH:mm/
  },
  weekdaysShort : 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
  weekdaysMin : 'S_P_A_T_K_Pn_Š'.split('_'),
  weekdaysParseExact : true,
  longDateFormat : {
      LT : 'HH:mm',
      LTS : 'HH:mm:ss',
      L : 'YYYY-MM-DD',
      LL : 'YYYY [m.] MMMM D [d.]',
      LLL : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
      LLLL : 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
      l : 'YYYY-MM-DD',
      ll : 'YYYY [m.] MMMM D [d.]',
      lll : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
      llll : 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
  },
  calendar : {
      sameDay : '[Šiandien] LT',
      nextDay : '[Rytoj] LT',
      nextWeek : 'dddd LT',
      lastDay : '[Vakar] LT',
      lastWeek : '[Praėjusį] dddd LT',
      sameElse : 'L'
  },
  relativeTime : {
      future : 'po %s',
      past : 'prieš %s',
      s : translateSeconds,
      ss : translate,
      m : translateSingular,
      mm : translate,
      h : translateSingular,
      hh : translate,
      d : translateSingular,
      dd : translate,
      M : translateSingular,
      MM : translate,
      y : translateSingular,
      yy : translate
  },
  dayOfMonthOrdinalParse: /\d{1,2}-oji/,
  ordinal(num) {
      return num + '-oji';
  },
  week : {
      dow : 1, // Monday is the first day of the week.
      doy : 4  // The week that contains Jan 4th is the first week of the year.
  }
};
