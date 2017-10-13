import { UnitOfTime } from '../types';
import { endOf, startOf } from './start-end-of';

export function isAfter(
  date1: Date,
  date2: Date,
  units: UnitOfTime = 'milliseconds'
): boolean {
  if (!date1 || !date2) {
    return false;
  }

  if (units === 'milliseconds') {
    return date1.valueOf() > date2.valueOf();
  }

  return date2.valueOf() < startOf(date1, units).valueOf();
}

export function isBefore(
  date1: Date,
  date2: Date,
  units: UnitOfTime = 'milliseconds'
): boolean {
  if (!date1 || !date2) {
    return false;
  }

  if (units === 'milliseconds') {
    return date1.valueOf() < date2.valueOf();
  }

  return endOf(date1, units).valueOf() < date2.valueOf();
}

export function isBetween(
  date: Date,
  from: Date,
  to: Date,
  units: UnitOfTime,
  inclusivity = '()'
): boolean {
  const leftBound =
    inclusivity[0] === '('
      ? isAfter(date, from, units)
      : !isBefore(date, from, units);
  const rightBound =
    inclusivity[1] === ')'
      ? isBefore(date, to, units)
      : !isAfter(date, to, units);

  return leftBound && rightBound;
}

export function isSame(
  date1: Date,
  date2: Date,
  units: UnitOfTime = 'milliseconds'
): boolean {
  if (!date1 || !date2) {
    return false;
  }

  if (units === 'milliseconds') {
    return date1.valueOf() === date2.valueOf();
  }

  const inputMs = date2.valueOf();

  return (
    startOf(date1, units).valueOf() <= inputMs &&
    inputMs <= endOf(date1, units).valueOf()
  );
}

export function isSameOrAfter(
  date1: Date,
  date2: Date,
  units?: UnitOfTime
): boolean {
  return isSame(date1, date2, units) || isAfter(date1, date2, units);
}

export function isSameOrBefore(
  date1: Date,
  date2: Date,
  units?: UnitOfTime
): boolean {
  return isSame(date1, date2, units) || isBefore(date1, date2, units);
}
