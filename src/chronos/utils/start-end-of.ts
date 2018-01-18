// tslint:disable: switch-default
import { TimeUnit, UnitOfTime } from '../types';
import {
  setDate, setFullDate, setHours, setMilliseconds, setMinutes, setMonth, setSeconds,
  shiftDate
} from './date-setters';
import { cloneDate } from '../create/clone';
import { setISODayOfWeek, setLocaleDayOfWeek } from '../units/day-of-week';
import { getMonth } from './date-getters';
import { add, subtract } from '../moment/add-subtract';

export function startOf(date: Date, unit: UnitOfTime, isUTC?: boolean): Date {
  const _date = cloneDate(date);
  // the following switch intentionally omits break keywords
  // to utilize falling through the cases.
  switch (unit) {
    case 'year':
      setMonth(_date, 0, isUTC);
    /* falls through */
    case 'quarter':
    case 'month':
      setDate(_date, 1, isUTC);
    /* falls through */
    case 'week':
    case 'isoWeek':
    case 'day':
    case 'date':
      setHours(_date, 0, isUTC);
    /* falls through */
    case 'hours':
      setMinutes(_date, 0, isUTC);
    /* falls through */
    case 'minutes':
      setSeconds(_date, 0, isUTC);
    /* falls through */
    case 'seconds':
      setMilliseconds(_date, 0, isUTC);
  }

  // weeks are a special case
  if (unit === 'week') {
    setLocaleDayOfWeek(_date, 0, {isUTC});
  }
  if (unit === 'isoWeek') {
    setISODayOfWeek(_date, 1);
  }

  // quarters are also special
  if (unit === 'quarter') {
    setMonth(_date, Math.floor(getMonth(_date, isUTC) / 3) * 3, isUTC);
  }

  return _date;
}

export function endOf(date: Date, unit: UnitOfTime, isUTC?: boolean): Date {
  let _unit = unit;
  // 'date' is an alias for 'day', so it should be considered as such.
  if (_unit === 'date') {
    _unit = 'day';
  }

  const start = startOf(date, _unit, isUTC);
  const _step = add(start, 1, _unit === 'isoWeek' ? 'week' : _unit, isUTC);
  const res = subtract(_step, 1, 'milliseconds', isUTC);

  return res;
}
