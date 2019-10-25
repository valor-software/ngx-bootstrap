import { TimeUnit } from '../types';
import { daysInMonth } from '../units/month';
import { isNumber } from './type-checks';
import { getDate, getFullYear, getMonth } from './date-getters';
import { isLeapYear } from '../units/year';
import { createDate } from '../create/date-from-array';

const defaultTimeUnit: TimeUnit = {
  year: 0,
  month: 0,
  day: 0,
  hour: 0,
  minute: 0,
  seconds: 0
};

export function shiftDate(date: Date, unit: TimeUnit): Date {
  const _unit = Object.assign({}, defaultTimeUnit, unit);
  const year = date.getFullYear() + (_unit.year || 0);
  const month = date.getMonth() + (_unit.month || 0);
  let day = date.getDate() + (_unit.day || 0);
  if (_unit.month && !_unit.day) {
    day = Math.min(day, daysInMonth(year, month));
  }

  return createDate(
    year,
    month,
    day,
    date.getHours() + (_unit.hour || 0),
    date.getMinutes() + (_unit.minute || 0),
    date.getSeconds() + (_unit.seconds || 0)
  );
}

export function setFullDate(date: Date, unit: TimeUnit): Date {
  return createDate(
    getNum(date.getFullYear(), unit.year),
    getNum(date.getMonth(), unit.month),
    1, // day, to avoid issue with wrong months selection at the end of current month (#5371)
    getNum(date.getHours(), unit.hour),
    getNum(date.getMinutes(), unit.minute),
    getNum(date.getSeconds(), unit.seconds),
    getNum(date.getMilliseconds(), unit.milliseconds)
  );
}

function getNum(def: number, num?: number): number {
  return isNumber(num) ? num : def;
}

export function setFullYear(date: Date, value: number, isUTC?: boolean): Date {
  const _month = getMonth(date, isUTC);
  const _date = getDate(date, isUTC);
  const _year = getFullYear(date, isUTC);
  if (isLeapYear(_year) && _month === 1 && _date === 29) {
    const _daysInMonth = daysInMonth(value, _month);
    isUTC ? date.setUTCFullYear(value, _month, _daysInMonth) : date.setFullYear(value, _month, _daysInMonth);
  }

  isUTC ? date.setUTCFullYear(value) : date.setFullYear(value);

  return date;
}

export function setMonth(date: Date, value: number, isUTC?: boolean): Date {
  const dayOfMonth = Math.min(getDate(date), daysInMonth(getFullYear(date), value));
  isUTC ? date.setUTCMonth(value, dayOfMonth) : date.setMonth(value, dayOfMonth);

  return date;
}

export function setDay(date: Date, value: number, isUTC?: boolean): Date {
  isUTC ? date.setUTCDate(value) : date.setDate(value);

  return date;
}

export function setHours(date: Date, value: number, isUTC?: boolean): Date {
  isUTC ? date.setUTCHours(value) : date.setHours(value);

  return date;
}

export function setMinutes(date: Date, value: number, isUTC?: boolean): Date {
  isUTC ? date.setUTCMinutes(value) : date.setMinutes(value);

  return date;
}

export function setSeconds(date: Date, value: number, isUTC?: boolean): Date {
  isUTC ? date.setUTCSeconds(value) : date.setSeconds(value);

  return date;
}

export function setMilliseconds(date: Date, value: number, isUTC?: boolean): Date {
  isUTC ? date.setUTCMilliseconds(value) : date.setMilliseconds(value);

  return date;
}

export function setDate(date: Date, value: number, isUTC?: boolean): Date {
  isUTC ? date.setUTCDate(value) : date.setDate(value);

  return date;
}

export function setTime(date: Date, value: number): Date {
  date.setTime(value);

  return date;
}
