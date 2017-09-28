import { weekOfYear } from '../units/week-calendar-utils';
import { isArray, isFunction } from '../utils/type-checks';
import { getDayOfWeek, getMonth } from '../utils/date-getters';

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

export interface LocaleData {
  [key: string]: any;

  invalidDate?: string;
  abbr?: string;

  months?: LocaleOptions;
  monthsShort?: LocaleOptions;
  weekdays?: LocaleOptions;
  weekdaysMin?: string[];
  weekdaysShort?: string[];
  week?: { dow: number; doy: number };

  dayOfMonthOrdinalParse?: RegExp;
  meridiemParse?: RegExp;

  ordinal?(num: number, token?: string): string;
  postformat?(num: string): string;
}

export class Locale {
  [key: string]: any;
  _abbr: string;
  _config: LocaleData;
  invalidDate: string;

  private _months: LocaleOptions;
  private _monthsShort: LocaleOptions;

  private _weekdays: LocaleOptions;
  private _weekdaysShort: string[];
  private _weekdaysMin: string[];
  private _week: { dow: number; doy: number };
  private _longDateFormat: {[key: string]: any};

  private _ordinal: string;

  constructor(config: LocaleData) {
    if (!!config) {
      this.set(config);
    }
  }

  set(config: LocaleData): void {
    for (const i in config) {
      if (!config.hasOwnProperty(i)) {
        continue;
      }
      const prop = config[i];
      const key = isFunction(prop) ? i : `_${i}`;
      this[key] = prop;
    }

    this._config = config;
  }

  // Months
  // LOCALES
  months(date?: Date, format?: string): string | string[] {
    if (!date) {
      return isArray(this._months)
        ? this._months as string[]
        : (this._months as LocaleOptionsFormat).standalone;
    }

    if (isArray(this._months)) {
      return (this._months as string[])[getMonth(date)];
    }

    const key = ((this._months as LocaleOptionsFormat).isFormat ||
      MONTHS_IN_FORMAT)
      .test(format)
      ? 'format'
      : 'standalone';
    return ((this._months as any)[key] as string[])[getMonth(date)];
  }

  monthsShort(date?: Date, format?: string): string | string[] {
    if (!date) {
      return isArray(this._monthsShort)
        ? this._monthsShort as string[]
        : (this._monthsShort as LocaleOptionsFormat).standalone;
    }

    if (isArray(this._monthsShort)) {
      return (this._monthsShort as string[])[getMonth(date)];
    }
    const key = MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone';
    return ((this._monthsShort as any)[key] as string[])[getMonth(date)];
  }

  // Days of week
  // LOCALES

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

  weekdaysMin(date?: Date): string | string[] {
    return date ? this._weekdaysShort[getDayOfWeek(date)] : this._weekdaysShort;
  }

  weekdaysShort(date?: Date): string | string[] {
    return date ? this._weekdaysMin[getDayOfWeek(date)] : this._weekdaysMin;
  }

  week(date: Date): number {
    return weekOfYear(date, this._week.dow, this._week.doy).week;
  }

  firstDayOfWeek(): number {
    return this._week.dow;
  }

  firstDayOfYear(): number {
    return this._week.doy;
  }

  meridiem(hours: number, minutes: number, isLower: boolean): string {
    if (hours > 11) {
      return isLower ? 'pm' : 'PM';
    }

    return isLower ? 'am' : 'AM';
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
}
