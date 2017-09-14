import { TimeUnit } from '../types';

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
  seconds = 0
): Date {
  const _date = new Date();
  return new Date(
    year || _date.getFullYear(),
    month,
    day,
    hour,
    minute,
    seconds
  );
}

export function shiftDate(date: Date, unit: TimeUnit): Date {
  const _unit = Object.assign({}, defaultTimeUnit, unit);

  return createDate(
    date.getFullYear() + _unit.year,
    date.getMonth() + _unit.month,
    date.getDate() + _unit.day,
    date.getHours() + _unit.hour,
    date.getMinutes() + _unit.minute,
    date.getSeconds() + _unit.seconds
  );
}

export function setDate(date: Date, unit: TimeUnit): Date {
  return createDate(
    getNum(date.getFullYear(), unit.year),
    getNum(date.getMonth(), unit.month),
    getNum(date.getDate(), unit.day),
    getNum(date.getHours(), unit.hour),
    getNum(date.getMinutes(), unit.minute),
    getNum(date.getSeconds(), unit.seconds)
  );
}

function getNum(def: number, num: number): number {
  return typeof num === 'number' ? num : def;
}
