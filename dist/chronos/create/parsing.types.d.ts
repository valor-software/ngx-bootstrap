import { Locale } from '../locale/locale.class';
import { DateArray, WeekParsing } from '../types';
import { DateInput } from '../test/chain';
export interface DateParsingConfig {
    /** date value */
    _d?: Date;
    /** DateArray [year, month, date, .....] */
    _a?: DateArray;
    /** date meridiem */
    _meridiem?: string;
    /** is PM */
    _isPm?: boolean;
    _isUTC?: boolean;
    _useUTC?: boolean;
    /** input to parse: could be string, number[], number, Date, object */
    _i?: DateInput;
    /** locale key, 'en' by default */
    _l?: string;
    /** date locale obj */
    _locale?: Locale;
    /** date format */
    _f?: string | string[];
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
    _w?: WeekParsing;
    _dayOfYear?: number;
    /** used in set offset */
    _changeInProgress?: boolean;
    _zoneDelta?: number;
}
export interface DateParsingFlags {
    _overflowDayOfYear?: boolean;
    _overflowWeeks?: boolean;
    _overflowWeekday?: boolean;
    score?: number;
    bigHour?: boolean;
    empty: boolean;
    unusedTokens: string[];
    unusedInput: string[];
    overflow: number;
    charsLeftOver: number;
    nullInput: boolean;
    invalidMonth: boolean;
    invalidWeekday?: boolean;
    invalidFormat: boolean;
    userInvalidated: boolean;
    iso: boolean;
    parsedDateParts: DateArray;
    meridiem: string;
    rfc2822: boolean;
    weekdayMismatch: boolean;
}
