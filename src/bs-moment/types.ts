import { Locale } from './locale/locale.class';
import { DateParsingConfig } from './create/parsing.types';

export type UnitOfTime =
  | 'year'
  | 'month'
  | 'week'
  | 'day'
  | 'hours'
  | 'minutes'
  | 'seconds'
  | 'milliseconds';

export interface TimeUnit {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  seconds?: number;
}

export type DateFormatterFn = (
  date: Date,
  format: string,
  locale?: Locale
) => string;

// todo: should replace TimeUnit
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
export interface DateObject {
  year: number;
  /* One digit */
  month: number;
  /* Day of the month */
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  // may be?
  week: number;
  quarter: number;
}

export type DateArray = number[];
export type DateParseTokenFn = (input: string, array: DateArray, config: DateParsingConfig, token: string) => DateArray;
