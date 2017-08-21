export type UnitOfTime = 'year' | 'month' | 'week' | 'day' | 'hour' |
  'minute' | 'seconds' | 'milliseconds';

export interface TimeUnit {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  seconds?: number;
}
