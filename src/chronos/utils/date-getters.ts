import { createDate } from '../create/date-from-array';

export function getHours(date: Date, isUTC = false): number {
  return isUTC ? date.getUTCHours() : date.getHours();
}

export function getMinutes(date: Date, isUTC = false): number {
  return isUTC ? date.getUTCMinutes() : date.getMinutes();
}

export function getSeconds(date: Date, isUTC = false): number {
  return isUTC ? date.getUTCSeconds() : date.getSeconds();
}

export function getMilliseconds(date: Date, isUTC = false): number {
  return isUTC ? date.getUTCMilliseconds() : date.getMilliseconds();
}
export function getTime(date: Date): number {
  return date.getTime();
}

export function getDay(date: Date, isUTC = false): number {
  return isUTC ? date.getUTCDay() : date.getDay();
}

export function getDate(date: Date, isUTC = false): number {
  return isUTC ? date.getUTCDate() : date.getDate();
}

export function getMonth(date: Date, isUTC = false): number {
  return isUTC ? date.getUTCMonth() : date.getMonth();
}

export function getFullYear(date: Date, isUTC = false): number {
  return isUTC ? date.getUTCFullYear() : date.getFullYear();
}

export function getUnixTime(date: Date): number {
  return Math.floor(date.valueOf() / 1000);
}

export function unix(date: Date): number {
  return Math.floor(date.valueOf() / 1000);
}

export function getFirstDayOfMonth(date: Date): Date {
  return createDate(
    date.getFullYear(),
    date.getMonth(),
    1,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
}

export function daysInMonth(date: Date): number {
  return _daysInMonth(date.getFullYear(), date.getMonth());
}

export function _daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

export function isFirstDayOfWeek(date: Date, firstDayOfWeek: number): boolean {
  return date.getDay() === firstDayOfWeek;
}

export function isSameMonth(date1: Date, date2: Date) {
  if (!date1 || !date2) {
    return false;
  }

  return isSameYear(date1, date2) && getMonth(date1) === getMonth(date2);
}

export function isSameYear(date1: Date, date2: Date) {
  if (!date1 || !date2) {
    return false;
  }

  return getFullYear(date1) === getFullYear(date2);
}

export function isSameDay(date1: Date, date2: Date): boolean {
  if (!date1 || !date2) {
    return false;
  }

  return (
    isSameYear(date1, date2) &&
    isSameMonth(date1, date2) &&
    getDate(date1) === getDate(date2)
  );
}
