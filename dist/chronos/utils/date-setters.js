import { daysInMonth } from '../units/month';
import { isNumber } from './type-checks';
import { getDate, getFullYear, getMonth } from './date-getters';
import { isLeapYear } from '../units/year';
import { createDate } from '../create/date-from-array';
var defaultTimeUnit = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    seconds: 0
};
export function shiftDate(date, unit) {
    var _unit = Object.assign({}, defaultTimeUnit, unit);
    var year = date.getFullYear() + (_unit.year || 0);
    var month = date.getMonth() + (_unit.month || 0);
    var day = date.getDate() + (_unit.day || 0);
    if (_unit.month && !_unit.day) {
        day = Math.min(day, daysInMonth(year, month));
    }
    return createDate(year, month, day, date.getHours() + (_unit.hour || 0), date.getMinutes() + (_unit.minute || 0), date.getSeconds() + (_unit.seconds || 0));
}
export function setFullDate(date, unit) {
    return createDate(getNum(date.getFullYear(), unit.year), getNum(date.getMonth(), unit.month), getNum(date.getDate(), unit.day), getNum(date.getHours(), unit.hour), getNum(date.getMinutes(), unit.minute), getNum(date.getSeconds(), unit.seconds), getNum(date.getMilliseconds(), unit.milliseconds));
}
function getNum(def, num) {
    return isNumber(num) ? num : def;
}
export function setFullYear(date, value, isUTC) {
    var _month = getMonth(date, isUTC);
    var _date = getDate(date, isUTC);
    var _year = getFullYear(date, isUTC);
    if (isLeapYear(_year) && _month === 1 && _date === 29) {
        var _daysInMonth = daysInMonth(value, _month);
        isUTC ? date.setUTCFullYear(value, _month, _daysInMonth) : date.setFullYear(value, _month, _daysInMonth);
    }
    isUTC ? date.setUTCFullYear(value) : date.setFullYear(value);
    return date;
}
export function setMonth(date, value, isUTC) {
    var dayOfMonth = Math.min(getDate(date), daysInMonth(getFullYear(date), value));
    isUTC ? date.setUTCMonth(value, dayOfMonth) : date.setMonth(value, dayOfMonth);
    return date;
}
export function setDay(date, value, isUTC) {
    isUTC ? date.setUTCDate(value) : date.setDate(value);
    return date;
}
export function setHours(date, value, isUTC) {
    isUTC ? date.setUTCHours(value) : date.setHours(value);
    return date;
}
export function setMinutes(date, value, isUTC) {
    isUTC ? date.setUTCMinutes(value) : date.setMinutes(value);
    return date;
}
export function setSeconds(date, value, isUTC) {
    isUTC ? date.setUTCSeconds(value) : date.setSeconds(value);
    return date;
}
export function setMilliseconds(date, value, isUTC) {
    isUTC ? date.setUTCMilliseconds(value) : date.setMilliseconds(value);
    return date;
}
export function setDate(date, value, isUTC) {
    isUTC ? date.setUTCDate(value) : date.setDate(value);
    return date;
}
export function setTime(date, value) {
    date.setTime(value);
    return date;
}
//# sourceMappingURL=date-setters.js.map