// tslint:disable:comment-format binary-expression-operand-order max-line-length
// tslint:disable:no-bitwise prefer-template cyclomatic-complexity
// tslint:disable:no-shadowed-variable switch-default prefer-const
// tslint:disable:one-variable-per-declaration newline-before-return

//! moment.js locale configuration
//! locale : Serbian (Cyrillic) [sr-cyrl]
//! authors : Vladimir Kukic: https://github.com/kukicvladimir,
//!           Surányi Gábor: https://github.com/surexxx

import { LocaleData } from '../locale/locale.class';
export const srCyrlLocale: LocaleData = {
  abbr: 'sr-cyrl-rs',
  months: 'Јануар_Фебруар_Март_Април_Мај_Јун_Јул_Август_Септембар_Октобар_Новембар_Децембар'.split('_'),
  monthsShort: 'Јан_Феб_Мар_Апр_Мај_Јун_Јул_Авг_Сеп_Окт_Нов_Дец'.split('_'),
  weekdays: 'Недеља_Понедељак_Уторак_Среда_Четвртак_Петак_Субота'.split('_'),
  weekdaysShort: 'Нед_Пон_Уто_Сре_Чет_Пет_Суб'.split('_'),
  weekdaysMin: 'Не_По_Ут_Ср_Че_Пе_Су'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  calendar: {
    sameDay: '[Данас y] LT',
    nextDay: '[Сутра y] LT',
    nextWeek: 'dddd [y] LT',
    lastDay: '[Јуче y] LT',
    lastWeek: '[Прошле] dddd [y] LT',
    sameElse: 'L'
  },
  invalidDate: 'Неважећи датум',
  relativeTime: {
    future: 'за %s',
    past: '%s пре',
    s: 'неколико секунди',
    ss: '%d секунди',
    m: 'минутa',
    mm: '%d минутa',
    h: 'сат',
    hh: '%d сати',
    d: 'дан',
    dd: '%d дана',
    M: 'месец дана',
    MM: '%d месеци',
    y: 'годинa',
    yy: '%d годинa'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
  ordinal(_num: number): string {
    const num = Number(_num);
    const b = num % 10,
      output = (~~(num % 100 / 10) === 1) ? '.' :
        (b === 1) ? '.' :
          (b === 2) ? '.' :
            (b === 3) ? '.' : '.';
    return num + output;
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  }
};
