// tslint:disable:max-file-line-count max-line-length

import { weekOfYear } from '../units/week-calendar-utils';
import { hasOwnProp, isArray, isFunction } from '../utils/type-checks';
import { getDayOfWeek, getMonth } from '../utils/date-getters';
import { matchWord, regexEscape } from '../parse/regex';

export interface LocaleOptionsFormat {
  format: string[];
  standalone: string[];
  isFormat?: RegExp;
}

export type LocaleOptions = string[] | LocaleOptionsFormat;

const MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
export const defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
  '_'
);
export const defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
  '_'
);
export const defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
  '_'
);
export const defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split(
  '_'
);
export const defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
export const defaultLongDateFormat: { [index: string]: string } = {
  LTS: 'h:mm:ss A',
  LT: 'h:mm A',
  L: 'MM/DD/YYYY',
  LL: 'MMMM D, YYYY',
  LLL: 'MMMM D, YYYY h:mm A',
  LLLL: 'dddd, MMMM D, YYYY h:mm A'
};

export const defaultOrdinal = '%d';
export const defaultDayOfMonthOrdinalParse = /\d{1,2}/;

const defaultMonthsShortRegex = matchWord;
const defaultMonthsRegex = matchWord;

export type OrdinalDateFn = (num: number, token?: string) => string;
export type PluralizeDateFn = (num: number, withoutSuffix: boolean,
                               key?: string, isFuture?: boolean) => string;

export interface LocaleData {
  abbr?: string;

  months?: LocaleOptions;
  monthsShort?: LocaleOptions;
  monthsParseExact?: boolean;

  weekdays?: LocaleOptions;
  weekdaysShort?: string[];
  weekdaysMin?: string[];
  weekdaysParseExact?: boolean;

  longDateFormat?: { [index: string]: string };
  calendar?: { [key: string]: string };
  relativeTime?: { [key: string]: string | PluralizeDateFn };
  dayOfMonthOrdinalParse?: RegExp;
  ordinal?: string | OrdinalDateFn;

  week?: { dow: number; doy: number };

  invalidDate?: string;

  monthsRegex?: RegExp;
  monthsParse?: RegExp[];
  monthsShortRegex?: RegExp;
  monthsStrictRegex?: RegExp;
  monthsShortStrictRegex?: RegExp;
  longMonthsParse?: RegExp[];
  shortMonthsParse?: RegExp[];

  meridiemParse?: RegExp;

  meridiemHour?(hour: number, meridiem: string): number;

  preparse?(str: string): string;

  postformat?(str: string | number): string;

  meridiem?(hour: number, minute?: number, isLower?: boolean): string;

  isPM?(input: string): boolean;
}

export class Locale {
  // [key: string]: any;
  _abbr: string;
  _config: LocaleData;
  meridiemHour: (hour: number, meridiem: string) => number;

  _invalidDate: string;
  _week: { dow: number; doy: number };
  _dayOfMonthOrdinalParse: RegExp;
  _ordinalParse: RegExp;
  _meridiemParse: RegExp;

  private _relativeTime: { future: string; past: string };
  private _months: LocaleOptions;
  private _monthsShort: LocaleOptions;
  private _monthsRegex: RegExp;
  private _monthsShortRegex: RegExp;
  private _monthsStrictRegex: RegExp;
  private _monthsShortStrictRegex: RegExp;
  private _monthsParse: RegExp[];
  private _longMonthsParse: string[] | RegExp[];
  private _shortMonthsParse: string[] | RegExp[];
  private _monthsParseExact: RegExp;
  private _weekdaysParseExact: boolean;

  private _weekdays: LocaleOptions;
  private _weekdaysShort: string[];
  private _weekdaysMin: string[];
  private _weekdaysParse: RegExp[];
  private _minWeekdaysParse: RegExp[];
  private _shortWeekdaysParse: RegExp[];
  private _fullWeekdaysParse: RegExp[];
  private _longDateFormat: { [key: string]: string };

  private _ordinal: string;

  constructor(config: LocaleData) {
    if (!!config) {
      this.set(config);
    }
  }

  set(config: LocaleData): void {
    let confKey;
    for (confKey in config) {
      if (!config.hasOwnProperty(confKey)) {
        continue;
      }
      const prop = config[confKey as keyof LocaleData];
      const key = (isFunction(prop) ? confKey : `_${confKey}`) as keyof Locale;

      this[key] = prop as any;
    }

    this._config = config;
  }

  longDateFormat(key: string) {
    const format = this._longDateFormat[key];
    const formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
      return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val: string) {
      return val.slice(1);
    });

    return this._longDateFormat[key];
  }

  get invalidDate(): string {
    return this._invalidDate;
  }

  set invalidDate(val: string) {
    this._invalidDate = val;
  }

  ordinal(num: number, token?: string): string {
    return this._ordinal.replace('%d', num.toString(10));
  }

  preparse(str: string) {
    return str;
  }

  postformat(str: string) {
    return str;
  }

  relativeTime(num: number, withoutSuffix: string, str: 'future' | 'past', isFuture: boolean): string {
    const output = this._relativeTime[str];

    return (isFunction(output)) ?
      output(num, withoutSuffix, str, isFuture) :
      output.replace(/%d/i, num.toString(10));
  }

  pastFuture(diff: number, output: string): string {
    const format = this._relativeTime[diff > 0 ? 'future' : 'past'];

    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
  }

  /** Months */
  months(): string[];
  months(date: Date, format: string): string;
  months(date?: Date, format?: string): string | string[] {
    if (!date) {
      return isArray<string>(this._months)
        ? this._months
        : this._months.standalone;
    }

    if (isArray<string>(this._months)) {
      return this._months[getMonth(date)];
    }

    const key = (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
      ? 'format'
      : 'standalone';

    return this._months[key][getMonth(date)];
  }

  monthsShort(): string[];
  monthsShort(date?: Date, format?: string): string;

  monthsShort(date?: Date, format?: string): string | string[] {
    if (!date) {
      return isArray<string>(this._monthsShort)
        ? this._monthsShort
        : this._monthsShort.standalone;
    }

    if (isArray<string>(this._monthsShort)) {
      return this._monthsShort[getMonth(date)];
    }
    const key = MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone';

    return this._monthsShort[key][getMonth(date)];
  }

  monthsParse(monthName: string, format: string, strict?: boolean): number {
    let date;
    let regex;

    if (this._monthsParseExact) {
      return this.handleMonthStrictParse(monthName, format, strict);
    }

    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    let i;
    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      date = new Date(2000, i);
      if (strict && !this._longMonthsParse[i]) {
        const _months = this.months(date, '').replace('.', '');
        const _shortMonths = this.monthsShort(date, '').replace('.', '');
        this._longMonthsParse[i] = new RegExp(`^${_months}$`, 'i');
        this._shortMonthsParse[i] = new RegExp(`^${_shortMonths}$`, 'i');
      }
      if (!strict && !this._monthsParse[i]) {
        regex = `^${this.months(date, '')}|^${this.monthsShort(date, '')}`;
        this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
      }
      // test the regex
      if (strict && format === 'MMMM' && (this._longMonthsParse[i] as RegExp).test(monthName)) {
        return i;
      }

      if (strict && format === 'MMM' && (this._shortMonthsParse[i] as RegExp).test(monthName)) {
        return i;
      }

      if (!strict && this._monthsParse[i].test(monthName)) {
        return i;
      }
    }
  }

  monthsRegex(isStrict: boolean): RegExp {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        this.computeMonthsParse();
      }
      if (isStrict) {
        return this._monthsStrictRegex;
      }

      return this._monthsRegex;
    }

    if (!hasOwnProp(this, '_monthsRegex')) {
      this._monthsRegex = defaultMonthsRegex;
    }

    return this._monthsStrictRegex && isStrict ?
      this._monthsStrictRegex : this._monthsRegex;
  }

  monthsShortRegex(isStrict: boolean): RegExp {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        this.computeMonthsParse();
      }
      if (isStrict) {
        return this._monthsShortStrictRegex;
      }

      return this._monthsShortRegex;
    }
    if (!hasOwnProp(this, '_monthsShortRegex')) {
      this._monthsShortRegex = defaultMonthsShortRegex;
    }

    return this._monthsShortStrictRegex && isStrict ?
      this._monthsShortStrictRegex : this._monthsShortRegex;
  }

  /** Week */
  week(date: Date): number {
    return weekOfYear(date, this._week.dow, this._week.doy).week;
  }

  firstDayOfWeek(): number {
    return this._week.dow;
  }

  firstDayOfYear(): number {
    return this._week.doy;
  }

  /** Day of Week */
  weekdays(): string[];
  weekdays(date: Date, format: string): string;
  weekdays(date?: Date, format?: string): string | string[] {
    const _isArray = isArray(this._weekdays as string[]);
    if (!date) {
      return _isArray
        ? this._weekdays as string[]
        : (this._weekdays as LocaleOptionsFormat).standalone;
    }

    if (_isArray) {
      return (this._weekdays as string[])[getDayOfWeek(date)];
    }

    const _key = (this._weekdays as LocaleOptionsFormat).isFormat.test(format)
      ? 'format'
      : 'standalone';

    return ((this._weekdays as any)[_key] as string[])[getDayOfWeek(date)];
  }

  weekdaysMin(): string[];
  weekdaysMin(date: Date): string;
  weekdaysMin(date?: Date): string | string[] {
    return date ? this._weekdaysShort[getDayOfWeek(date)] : this._weekdaysShort;
  }

  weekdaysShort(): string[];
  weekdaysShort(date: Date): string;
  weekdaysShort(date?: Date): string | string[] {
    return date ? this._weekdaysMin[getDayOfWeek(date)] : this._weekdaysMin;
  }

  // proto.weekdaysParse  =        localeWeekdaysParse;
  /*weekdaysParse (weekdayName: string, format: string, strict: boolean): number  {
    let date;
    let regex;

    if (this._weekdaysParseExact) {
      return this.handleWeekStrictParse(weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._minWeekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._fullWeekdaysParse = [];
    }

    let i;
    for (i = 0; i < 7; i++) {
      // make the regex if we don't have it already

      date = createUTC([2000, 1]).day(i);
      if (strict && !this._fullWeekdaysParse[i]) {
        this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(date, '').replace('.', '\.?') + '$', 'i');
        this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(date, '').replace('.', '\.?') + '$', 'i');
        this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(date, '').replace('.', '\.?') + '$', 'i');
      }
      if (!this._weekdaysParse[i]) {
        regex = '^' + this.weekdays(date, '') + '|^' + this.weekdaysShort(date, '') + '|^' + this.weekdaysMin(date, '');
        this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
      }
      // test the regex
      if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
        return i;
      }
    }
  }*/

  // proto.weekdaysRegex       =        weekdaysRegex;
  // proto.weekdaysShortRegex  =        weekdaysShortRegex;
  // proto.weekdaysMinRegex    =        weekdaysMinRegex;


  isPM(input: string): boolean {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return input.toLowerCase().charAt(0) === 'p';
  }

  meridiem(hours: number, minutes: number, isLower: boolean): string {
    if (hours > 11) {
      return isLower ? 'pm' : 'PM';
    }

    return isLower ? 'am' : 'AM';
  }

  formatLongDate(key: string) {
    this._longDateFormat = this._longDateFormat ? this._longDateFormat : defaultLongDateFormat;
    const format = this._longDateFormat[key];
    const formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
      return format;
    }

    this._longDateFormat[
      key
      ] = formatUpper.replace(/MMMM|MM|DD|dddd/g, (val: string) => {
      return val.slice(1);
    });

    return this._longDateFormat[key];
  }

  /*private handleWeekStrictParse(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._minWeekdaysParse = [];

      for (i = 0; i < 7; ++i) {
        mom = createUTC([2000, 1]).day(i);
        this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
        this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
        this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
      }
    }

    if (strict) {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._weekdaysParse, llc);
        if (ii !== -1) {
          return ii;
        }
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }*/

  private handleMonthStrictParse(monthName: string, format: string, strict?: boolean) {
    const llc = monthName.toLocaleLowerCase();
    let i;
    let ii;
    let mom;
    if (!this._monthsParse) {
      // this is not used
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
      for (i = 0; i < 12; ++i) {
        mom = new Date(2000, i);
        this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
        this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
      }
    }

    if (strict) {
      if (format === 'MMM') {
        ii = (this._shortMonthsParse as string[]).indexOf(llc);

        return ii !== -1 ? ii : null;
      }
      ii = (this._longMonthsParse as string[]).indexOf(llc);

      return ii !== -1 ? ii : null;
    }

    if (format === 'MMM') {
      ii = (this._shortMonthsParse as string[]).indexOf(llc);
      if (ii !== -1) {
        return ii;
      }

      ii = (this._longMonthsParse as string[]).indexOf(llc);

      return ii !== -1 ? ii : null;
    }

    ii = (this._longMonthsParse as string[]).indexOf(llc);
    if (ii !== -1) {
      return ii;
    }
    ii = (this._shortMonthsParse as string[]).indexOf(llc);

    return ii !== -1 ? ii : null;
  }

  private computeMonthsParse() {
    const shortPieces: string[] = [];
    const longPieces: string[] = [];
    const mixedPieces: string[] = [];
    let date;

    let i;
    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      date = new Date(2000, i);
      shortPieces.push(this.monthsShort(date, ''));
      longPieces.push(this.months(date, ''));
      mixedPieces.push(this.months(date, ''));
      mixedPieces.push(this.monthsShort(date, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp(`^(${mixedPieces.join('|')})`, 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp(`^(${longPieces.join('|')})`, 'i');
    this._monthsShortStrictRegex = new RegExp(`^(${shortPieces.join('|')})`, 'i');
  }
}

function cmpLenRev(a: string, b: string): number {
  return b.length - a.length;
}
