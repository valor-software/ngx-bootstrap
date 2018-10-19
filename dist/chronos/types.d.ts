import { Locale } from './locale/locale.class';
import { DateParsingConfig } from './create/parsing.types';
export declare type UnitOfTime = 'year' | 'month' | 'day' | 'date' | 'dayOfYear' | 'hours' | 'minutes' | 'seconds' | 'milliseconds' | 'quarter' | 'week' | 'isoWeek' | 'weekYear' | 'isoWeekYear' | 'weekday' | 'isoWeekday';
export interface TimeUnit {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    seconds?: number;
    milliseconds?: number;
}
export interface DateFormatterOptions {
    format: string;
    locale: Locale;
    isUTC: boolean;
    offset: number;
}
export declare type DateFormatterFn = (date: Date, opts: DateFormatterOptions) => string;
export interface DateObject {
    year?: number;
    month?: number;
    day?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
    week?: number;
    quarter?: number;
}
export declare type DateArray = number[];
export interface WeekParsing {
    [key: string]: number;
    [key: number]: number;
}
export declare type DateParseTokenFn = (input: string, array: DateArray | WeekParsing, config: DateParsingConfig, token?: string) => DateParsingConfig;
