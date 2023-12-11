//! moment.js locale configuration
//! locale : Persian [fa]
//! author : Meysam Bahadori: https://github.com/MeysamBahadori

import { LocaleData } from '../locale/locale.class';

const symbolMap: {[key: string]: string} = {
    1: '١',
    2: '٢',
    3: '٣',
    4: '٤',
    5: '٥',
    6: '٦',
    7: '٧',
    8: '٨',
    9: '٩',
    0: '٠'
  };

const numberMap: {[key: string]: string} = {
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
  '٠': '0'
};

const pluralForm = function (num: number): number {
    return num === 0 ? 0 : num === 1 ? 1 : num === 2 ? 2 : num % 100 >= 3 && num % 100 <= 10 ? 3 : num % 100 >= 11 ? 4 : 5;
  };
  
var plurals : {[key: string]: [string, string, [string, string], string, string, string]} = {
    s: ['کمتر از یک ثانیه', 'یک ثانیه', ['دو ثانیه', 'دو ثانیه'], '%d ثانیه', '%d ثانیه', '%d ثانیه'],
    m: ['کمتر از یک دقیقه', 'یک دقیقه', ['دو دقیقه', 'دو دقیقه'], '%d دقیقه', '%d دقیقه', '%d دقیقه'],
    h: ['کمتر از یک ساعت', 'یک ساعت', ['دو ساعت', 'دو ساعت'], '%d ساعت', '%d ساعت', '%d ساعت'],
    d: ['کمتر از یک روز', 'یک روز', ['دو روز', 'دو روز'], '%d روز', '%d روز', '%d روز'],
    M: ['کمتر از یک ماه', 'یک ماه', ['دو ماه', 'دو ماه'], '%d ماه', '%d ماه', '%d ماه'],
    y: ['کمتر از یک سال', 'یک سال', ['دو سال', 'دو سال'], '%d سال', '%d سال', '%d سال']
};

const pluralize = function (u: string) {
    return function (num: number, withoutSuffix: boolean): string {
      const f = pluralForm(num);
      let str = plurals[u][pluralForm(num)];
      if (f === 2) {
        str = str[withoutSuffix ? 0 : 1];
      }
  
      return (str as string).replace(/%d/i, num.toString());
    };
  };

  const months: string[] = [
    'ژانویه',
    'فوریه',
    'مارس',
    'آوریل',
    'می',
    'ژوئن',
    'جولای',
    'آگوست',
    'سپتامبر',
    'اکتبر',
    'نوامبر',
    'دسامبر'
];

export const faLocale: LocaleData = {
    abbr: 'fa',
    months: months,
    monthsShort: months,
    weekdays: 'یکشنبه_دوشنبه_سه شنبه_چهارشنبه_پنج شنبه_جمعه_شنبه'.split('_'),
    weekdaysShort: 'یکشنبه_دو‌شنبه_سه‌شنبه_چهار‌شنبه_پنج‌شنبه_جمعه_شنبه'.split('_'),
    weekdaysMin: 'ی_د_س_چ_پ_ج_ش'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'D/\u200FM/\u200FYYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /ص|م/,
    isPM(input) {
        return 'م' === input;
      },
      meridiem(hour, minute, isLower) {
        if (hour < 12) {
          return 'ص';
        } else {
          return 'م';
        }
      },
    calendar: {
        sameDay: '[امروز در ساعت] LT',
        nextDay: '[فردا در ساعت] LT',
        nextWeek: 'dddd [در ساعت] LT',
        lastDay: '[دیروز در ساعت] LT',
        lastWeek: 'dddd [در ساعت] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'بعد %s',
        past: 'پیش %s',
        s: pluralize('s'),
        ss: pluralize('s'),
        m: pluralize('m'),
        mm: pluralize('m'),
        h: pluralize('h'),
        hh: pluralize('h'),
        d: pluralize('d'),
        dd: pluralize('d'),
        M: pluralize('M'),
        MM: pluralize('M'),
        y: pluralize('y'),
        yy: pluralize('y')
    },
    preparse(str: string): string {
        return str.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
          return numberMap[match];
        }).replace(/،/g, ',');
      },
      postformat(str: string) {
        return str.replace(/\d/g, function (match) {
          return symbolMap[match];
        }).replace(/,/g, '،');
      },
    week: {
        dow: 6, // Saturday is the first day of the week.
        doy: 80 // The week that contains March 21th is the first week of the year.
    }
};
