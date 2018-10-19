import { Locale } from '../locale/locale.class';
export declare function parseWeekday(input: string | number, locale: Locale): number;
export declare function parseIsoWeekday(input: string | number, locale?: Locale): number;
export declare function getSetDayOfWeek(date: Date, input: number, opts: {
    isUTC?: boolean;
    locale: Locale;
}): Date | number;
export declare function setDayOfWeek(date: Date, input: number, locale?: Locale, isUTC?: boolean): Date;
export declare function getDayOfWeek(date: Date, isUTC?: boolean): number;
/********************************************/
export declare function getLocaleDayOfWeek(date: Date, locale?: Locale, isUTC?: boolean): number;
export declare function setLocaleDayOfWeek(date: Date, input: number, opts?: {
    locale?: Locale;
    isUTC?: boolean;
}): Date;
export declare function getISODayOfWeek(date: Date, isUTC?: boolean): number;
export declare function setISODayOfWeek(date: Date, input: number | string, opts?: {
    locale?: Locale;
}): Date;
