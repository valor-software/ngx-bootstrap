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

// export function getZoneAbbr() {
//   return this._isUTC ? 'UTC' : '';
// }
//
// export function getZoneName() {
//   return this._isUTC ? 'Coordinated Universal Time' : '';
// }
