import { Locale } from '../locale/locale.class';
import { DateArray } from '../types';

export interface DateParsingConfig {
  /** date value */
  _d?: Date;
  /** DateArray [year, month, date, .....] */
  _a?: DateArray;
  /** date meridiem */
  _meridiem?: string;
  // duplicate param?
  _isUTC?: boolean;
  _useUTC?: boolean;
  /** input to parse: could be string, number[], number, Date, object */
  _i?: string | number | { [key: string]: number };
  /** locale key, 'en' by default */
  _l?: string;
  /** date locale obj */
  _locale?: Locale;
  /** date format */
  _f?: string;
  /** use strict parse format */
  _strict?: boolean;
  /** add one day to result at the end of parsing */
  _nextDay?: boolean;
  /** utc time offset */
  _offset?: number;
  /** time zone */
  _tzm?: number;
  /** is valid */
  _isValid?: boolean;
  /** date parsing flags */
  _pf?: DateParsingFlags;

  /** date specific info */

  /** week */
  _w?: number;
  _dayOfYear?: number;
}

export interface DateParsingFlags {
  _overflowDayOfYear: boolean;
  bigHour: boolean;
  empty: boolean;
  unusedTokens: string[];
  unusedInput: string[];
  overflow: number;
  charsLeftOver: number;
  nullInput: boolean;
  // invalidMonth: null,
  invalidFormat: boolean;
  userInvalidated: boolean;
  iso: boolean;
  parsedDateParts: DateArray;
  meridiem: string;
  rfc2822: boolean;
  weekdayMismatch: boolean;
}
