// moment.js locale configuration
// locale : Thai-Buddhist Era [th-be]
// author : Watcharapol Sanitwong : https://github.com/tumit

import { LocaleData } from '../locale/locale.class';

export const thBeLocale: LocaleData = {
  abbr: 'th-be',
  months: 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
  monthsShort: 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
  monthsParseExact: true,
  weekdays: 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
  weekdaysShort: 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
  weekdaysMin: 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY เวลา H:mm',
    LLLL: 'วันddddที่ D MMMM YYYY เวลา H:mm'
  },
  meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
  isPM(input) {
    return input === 'หลังเที่ยง';
  },
  meridiem(hour, minute, isLower) {
    if (hour < 12) {
      return 'ก่อนเที่ยง';
    } else {
      return 'หลังเที่ยง';
    }
  },
  calendar: {
    sameDay: '[วันนี้ เวลา] LT',
    nextDay: '[พรุ่งนี้ เวลา] LT',
    nextWeek: 'dddd[หน้า เวลา] LT',
    lastDay: '[เมื่อวานนี้ เวลา] LT',
    lastWeek: '[วัน]dddd[ที่แล้ว เวลา] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'อีก %s',
    past: '%sที่แล้ว',
    s: 'ไม่กี่วินาที',
    ss: '%d วินาที',
    m: '1 นาที',
    mm: '%d นาที',
    h: '1 ชั่วโมง',
    hh: '%d ชั่วโมง',
    d: '1 วัน',
    dd: '%d วัน',
    M: '1 เดือน',
    MM: '%d เดือน',
    y: '1 ปี',
    yy: '%d ปี'
  },

  preparse(str: string, format?: string): string {

    const _format = thBeLocale.longDateFormat[format]
      ? thBeLocale.longDateFormat[format]
      : format;

    // endsWith('YYYY')
    if (_format.indexOf('YYYY', _format.length - 'YYYY'.length) !== -1 ) {
      const ddMM = str.substr(0, str.length - 4);
      const yyyy = parseInt(str.substr(str.length - 4), 10) - 543;
      return ddMM + yyyy;
    }

    return str;
  },

  getFullYear(date: Date, isUTC = false): number {
    return 543 + (isUTC ? date.getUTCFullYear() : date.getFullYear());
  }
};
