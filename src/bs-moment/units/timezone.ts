import { addFormatToken } from '../format-functions';

// todo: add support for timezones

// FORMATTING
addFormatToken('z', null, null,
  function (date: Date) {
    // return this._isUTC ? 'UTC' : '';
    return '';
  });
addFormatToken('zz', null, null, function (date: Date) {
  // return this._isUTC ? 'Coordinated Universal Time' : '';
  return '';
});

// MOMENTS

// export function getZoneAbbr() {
//   return this._isUTC ? 'UTC' : '';
// }
//
// export function getZoneName() {
//   return this._isUTC ? 'Coordinated Universal Time' : '';
// }
