import { Locale } from './locale/locale.class';

export type UnitOfTime =
  | 'year'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
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
