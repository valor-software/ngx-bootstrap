import { addFormatToken } from '../format/format';
import { DateFormatterOptions } from '../types';

// todo: add support for timezones

// FORMATTING
addFormatToken('z', null, null,
  function (date: Date, opts: DateFormatterOptions): string {
    return opts.isUTC ? 'UTC' : '';
  });
addFormatToken('zz', null, null,
  function (date: Date, opts: DateFormatterOptions): string {
    return opts.isUTC ? 'Coordinated Universal Time' : '';
  });

// MOMENTS

export function getZoneAbbr(isUTC: boolean) {
  return isUTC ? 'UTC' : '';
}

export function getZoneName(isUTC: boolean) {
  return isUTC ? 'Coordinated Universal Time' : '';
}
