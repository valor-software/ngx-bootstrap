import { LocaleData } from '../locale/locale.class';

//! moment.js locale configuration
//! locale : Mongolian [mn]
//! author : Javkhlantugs Nyamdorj : https://github.com/javkhaanj7

function translate(num: number, withoutSuffix: boolean, key: string, isFuture: boolean) {
  switch (key) {
    case 's':
      return withoutSuffix ? 'хэдхэн секунд' : 'хэдхэн секундын';
    case 'ss':
      return num + (withoutSuffix ? ' секунд' : ' секундын');
    case 'm':
    case 'mm':
      return num + (withoutSuffix ? ' минут' : ' минутын');
    case 'h':
    case 'hh':
      return num + (withoutSuffix ? ' цаг' : ' цагийн');
    case 'd':
    case 'dd':
      return num + (withoutSuffix ? ' өдөр' : ' өдрийн');
    case 'M':
    case 'MM':
      return num + (withoutSuffix ? ' сар' : ' сарын');
    case 'y':
    case 'yy':
      return num + (withoutSuffix ? ' жил' : ' жилийн');
    default:
      return num.toString(10);
  }
}

export const mnLocale: LocaleData = {
  abbr: 'mn',
  months: 'Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар'.split('_'),
  monthsShort: '1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар'.split('_'),
  monthsParseExact: true,
  weekdays: 'Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба'.split('_'),
  weekdaysShort: 'Ням_Дав_Мяг_Лха_Пүр_Баа_Бям'.split('_'),
  weekdaysMin: 'Ня_Да_Мя_Лх_Пү_Ба_Бя'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY оны MMMMын D',
    LLL: 'YYYY оны MMMMын D HH:mm',
    LLLL: 'dddd, YYYY оны MMMMын D HH:mm'
  },
  meridiemParse: /ҮӨ|ҮХ/i,
  isPM: function (input) {
    return input === 'ҮХ';
  },
  meridiem: function (hour, minute, isLower) {
    if (hour < 12) {
      return 'ҮӨ';
    } else {
      return 'ҮХ';
    }
  },
  calendar: {
    sameDay: '[Өнөөдөр] LT',
    nextDay: '[Маргааш] LT',
    nextWeek: '[Ирэх] dddd LT',
    lastDay: '[Өчигдөр] LT',
    lastWeek: '[Өнгөрсөн] dddd LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: '%s дараа',
    past: '%s өмнө',
    s: translate,
    ss: translate,
    m: translate,
    mm: translate,
    h: translate,
    hh: translate,
    d: translate,
    dd: translate,
    M: translate,
    MM: translate,
    y: translate,
    yy: translate
  },
  dayOfMonthOrdinalParse: /\d{1,2} өдөр/,
  ordinal: function (num: number, period: string): string {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return num + ' өдөр';
      default:
        return num.toString(10);
    }
  }
};
