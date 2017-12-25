import { TimeUnit } from '../types';
import { daysInMonth } from '../units/month';
import { isNumber } from './type-checks';

const defaultTimeUnit: TimeUnit = {
  year: 0,
  month: 0,
  day: 0,
  hour: 0,
  minute: 0,
  seconds: 0
};

export function createDate(
  year?: number,
  month = 0,
  day = 1,
  hour = 0,
  minute = 0,
  seconds = 0,
  milliseconds = 0
): Date {
  const _date = new Date();

  return new Date(
    year || _date.getFullYear(),
    month,
    day,
    hour,
    minute,
    seconds,
    milliseconds
  );
}

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
    getNum(date.getDate(), unit.day),
    getNum(date.getHours(), unit.hour),
    getNum(date.getMinutes(), unit.minute),
    getNum(date.getSeconds(), unit.seconds),
    getNum(date.getMilliseconds(), unit.milliseconds)
  );
}

function getNum(def: number, num?: number): number {
  return isNumber(num) ? num : def;
}

export function setFullYear(date: Date, value: number): Date {
  date.setFullYear(value);

  return date;
}

export function setMonth(date: Date, value: number, isUTC?: boolean): Date {
  isUTC ? date.setUTCMonth(value) : date.setMonth(value);

  return date;
}

export function setHours(date: Date, value: number): Date {
  date.setHours(value);

  return date;
}

export function setMinutes(date: Date, value: number): Date {
  date.setMinutes(value);

  return date;
}

export function setSeconds(date: Date, value: number): Date {
  date.setSeconds(value);

  return date;
}

export function setMilliseconds(date: Date, value: number): Date {
  date.setMilliseconds(value);

  return date;
}

export function setDate(date: Date, value: number, isUTC?: boolean): Date {
  isUTC ? date.setUTCDate(value) : date.setDate(value);

  return date;
}

export function setTime(date: Date, value: number, isUTC?: boolean): Date {
  date.setTime(value);

  return date;
}
