import { LocaleData } from '../locale/locale.class';

//! moment.js locale configuration
//! locale : Việt Nam [vi]
//! author : Chris Gedrim : https://github.com/chrisgedrim

export const viLocale: LocaleData = {
  abbr: 'vi',
  months : 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
  monthsShort : 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
  monthsParseExact: true,
  weekdays : 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
  weekdaysShort : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
  weekdaysMin : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
  weekdaysParseExact : true,
  meridiemParse: /sa|ch/i,
  isPM(input: string): boolean {
    return /^ch$/i.test(input);
  },
  meridiem(hours: number, minutes: number, isLower: boolean): string {
    if (hours < 12) {
      return isLower ? 'sa' : 'SA';
    } else {
      return isLower ? 'ch' : 'CH';
    }
  },
  longDateFormat : {
    LT : 'HH:mm',
    LTS : 'HH:mm:ss',
    L : 'DD/MM/YYYY',
    LL : 'D MMMM [năm] YYYY',
    LLL : 'D MMMM [năm] YYYY HH:mm',
    LLLL : 'dddd, D MMMM [năm] YYYY HH:mm',
    l : 'DD/M/YYYY',
    ll : 'D MMM YYYY',
    lll : 'D MMM YYYY HH:mm',
    llll : 'ddd, D MMM YYYY HH:mm'
  },
  calendar : {
    sameDay: '[Hôm nay lúc] LT',
    nextDay: '[Ngày mai lúc] LT',
    nextWeek: 'dddd [tuần tới lúc] LT',
    lastDay: '[Hôm qua lúc] LT',
    lastWeek: 'dddd [tuần trước lúc] LT',
    sameElse: 'L'
  },
  relativeTime : {
    future : '%s tới',
    past : '%s trước',
    s : 'vài giây',
    ss : '%d giây' ,
    m : 'một phút',
    mm : '%d phút',
    h : 'một giờ',
    hh : '%d giờ',
    d : 'một ngày',
    dd : '%d ngày',
    M : 'một tháng',
    MM : '%d tháng',
    y : 'một năm',
    yy : '%d năm'
  },
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal(_num: number): string {
    return '' + _num;
  },
  week : {
    dow : 1, // Thứ Hai là ngày đầu tuần.
    doy : 4  // Tuần chứa ngày 4 tháng 1 là tuần đầu tiên trong năm.
  }
};

