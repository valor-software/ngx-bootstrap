import { addFormatToken } from '../format/format';
// todo: add support for timezones
// FORMATTING
addFormatToken('z', null, null, function (date, opts) {
    return opts.isUTC ? 'UTC' : '';
});
addFormatToken('zz', null, null, function (date, opts) {
    return opts.isUTC ? 'Coordinated Universal Time' : '';
});
// MOMENTS
export function getZoneAbbr(isUTC) {
    return isUTC ? 'UTC' : '';
}
export function getZoneName(isUTC) {
    return isUTC ? 'Coordinated Universal Time' : '';
}
//# sourceMappingURL=timezone.js.map