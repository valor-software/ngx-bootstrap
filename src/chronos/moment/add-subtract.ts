import { createDuration } from '../duration/create';
import { absRound } from '../utils/abs-round';
import { Duration } from '../duration/constructor';
import { getDate, getMonth, getTime } from '../utils/date-getters';
import { setDate, setMonth, setTime } from '../utils/date-setters';
import { cloneDate } from '../create/clone';
import { UnitOfTime } from '../types';

export function add(date: Date, val: number, period: UnitOfTime, isUTC?: boolean): Date {
  const dur = createDuration(val, period);

  return addSubtract(date, dur, 1, isUTC);
}

export function subtract(date: Date, val: number, period: UnitOfTime, isUTC?: boolean): Date {
  const dur = createDuration(val, period);

  return addSubtract(date, dur, -1, isUTC);
}

export function addSubtract(date: Date, duration: Duration, isAdding: number, isUTC?: boolean): Date {
  const milliseconds = duration._milliseconds;
  const days = absRound(duration._days);
  const months = absRound(duration._months);

  // todo: add timezones support
  // const _updateOffset = updateOffset == null ? true : updateOffset;

  if (months) {
    setMonth(date, getMonth(date, isUTC) + months * isAdding, isUTC);
  }
  if (days) {
    setDate(date, getDate(date, isUTC) + days * isAdding, isUTC);
  }
  if (milliseconds) {
    setTime(date, getTime(date) + milliseconds * isAdding);
  }

  return cloneDate(date);
  // todo: add timezones support
  // if (_updateOffset) {
  //   hooks.updateOffset(date, days || months);
  // }
}
