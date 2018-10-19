export interface LocaleOptionsFormat {
    format: string[];
    standalone: string[];
    isFormat?: RegExp;
}
export declare type LocaleOptions = string[] | LocaleOptionsFormat;
export declare const defaultLocaleMonths: string[];
export declare const defaultLocaleMonthsShort: string[];
export declare const defaultLocaleWeekdays: string[];
export declare const defaultLocaleWeekdaysShort: string[];
export declare const defaultLocaleWeekdaysMin: string[];
export declare const defaultLongDateFormat: {
    [index: string]: string;
};
export declare const defaultOrdinal = "%d";
export declare const defaultDayOfMonthOrdinalParse: RegExp;
export declare type OrdinalDateFn = (num: number, token?: string) => string;
export declare type PluralizeDateFn = (num: number, withoutSuffix: boolean, key?: string, isFuture?: boolean) => string;
export interface LocaleData {
    abbr?: string;
    parentLocale?: string;
    months?: LocaleOptions | ((date: Date, format: string, isUTC?: boolean) => string | string[]);
    monthsShort?: LocaleOptions | ((date: Date, format: string, isUTC?: boolean) => string | string[]);
    monthsParseExact?: boolean;
    weekdays?: LocaleOptions | ((date: Date, format: string, isUTC?: boolean) => string | string[]);
    weekdaysShort?: string[] | ((date: Date, format: string, isUTC?: boolean) => string | string[]);
    weekdaysMin?: string[] | ((date: Date, format: string, isUTC?: boolean) => string | string[]);
    weekdaysParseExact?: boolean;
    longDateFormat?: {
        [index: string]: string;
    };
    calendar?: {
        [key: string]: (string | ((date: Date, now?: Date) => string) | ((dayOfWeek: number, isNextWeek: boolean) => string));
    };
    relativeTime?: {
        [key: string]: string | PluralizeDateFn;
    };
    dayOfMonthOrdinalParse?: RegExp;
    ordinal?: string | OrdinalDateFn;
    week?: {
        dow?: number;
        doy?: number;
    };
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
export declare class Locale {
    parentLocale?: Locale;
    _abbr: string;
    _config: LocaleData;
    meridiemHour: (hour: number, meridiem: string) => number;
    _invalidDate: string;
    _week: {
        dow: number;
        doy: number;
    };
    _dayOfMonthOrdinalParse: RegExp;
    _ordinalParse: RegExp;
    _meridiemParse: RegExp;
    private _calendar;
    private _relativeTime;
    private _months;
    private _monthsShort;
    private _monthsRegex;
    private _monthsShortRegex;
    private _monthsStrictRegex;
    private _monthsShortStrictRegex;
    private _monthsParse;
    private _longMonthsParse;
    private _shortMonthsParse;
    private _monthsParseExact;
    private _weekdaysParseExact;
    private _weekdaysRegex;
    private _weekdaysShortRegex;
    private _weekdaysMinRegex;
    private _weekdaysStrictRegex;
    private _weekdaysShortStrictRegex;
    private _weekdaysMinStrictRegex;
    private _weekdays;
    private _weekdaysShort;
    private _weekdaysMin;
    private _weekdaysParse;
    private _minWeekdaysParse;
    private _shortWeekdaysParse;
    private _fullWeekdaysParse;
    private _longDateFormat;
    private _ordinal;
    constructor(config: LocaleData);
    set(config: LocaleData): void;
    calendar(key: string, date: Date, now: Date): string;
    longDateFormat(key: string): string;
    invalidDate: string;
    ordinal(num: number, token?: string): string;
    preparse(str: string): string;
    postformat(str: string): string;
    relativeTime(num: number, withoutSuffix: boolean, str: 'future' | 'past', isFuture: boolean): string;
    pastFuture(diff: number, output: string): string;
    /** Months */
    months(): string[];
    months(date: Date, format?: string, isUTC?: boolean): string;
    monthsShort(): string[];
    monthsShort(date?: Date, format?: string, isUTC?: boolean): string;
    monthsParse(monthName: string, format?: string, strict?: boolean): number;
    monthsRegex(isStrict: boolean): RegExp;
    monthsShortRegex(isStrict: boolean): RegExp;
    /** Week */
    week(date: Date): number;
    firstDayOfWeek(): number;
    firstDayOfYear(): number;
    /** Day of Week */
    weekdays(): string[];
    weekdays(date: Date, format?: string, isUTC?: boolean): string;
    weekdaysMin(): string[];
    weekdaysMin(date: Date, format?: string, isUTC?: boolean): string;
    weekdaysShort(): string[];
    weekdaysShort(date: Date, format?: string, isUTC?: boolean): string;
    weekdaysParse(weekdayName?: string, format?: string, strict?: boolean): number;
    weekdaysRegex(isStrict: boolean): RegExp;
    weekdaysShortRegex(isStrict?: boolean): RegExp;
    weekdaysMinRegex(isStrict?: boolean): RegExp;
    isPM(input: string): boolean;
    meridiem(hours: number, minutes: number, isLower: boolean): string;
    formatLongDate(key: string): string;
    private handleMonthStrictParse(monthName, format, strict?);
    private handleWeekStrictParse(weekdayName, format, strict);
    private computeMonthsParse();
    private computeWeekdaysParse();
}
