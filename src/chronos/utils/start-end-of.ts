import { UnitOfTime } from '../types';
import { setDate, setHours, setMonth, setTime } from './date-setters';
import { cloneDate } from '../create/clone';
import { setISODayOfWeek, setLocaleDayOfWeek } from '../units/day-of-week';
import { getMilliseconds, getMinutes, getMonth, getSeconds, getTime } from './date-getters';
import { add, subtract } from '../moment/add-subtract';

// units that are added as an exact amount of milliseconds
const timeUnits: UnitOfTime[] = ['hours', 'minutes', 'seconds', 'milliseconds'];

function rewind(date: Date, milliseconds: number): void {
  setTime(date, getTime(date) - milliseconds);
}

export function startOf(date: Date, unit: UnitOfTime, isUTC?: boolean): Date {
  const _date = cloneDate(date);

  // weeks are a special case
  // the weekday is shifted before the time is stripped: on a day whose midnight is skipped by DST
  // the stripped time is 01:00, and shifting it afterwards would carry 01:00 to the first day of the week
  if (unit === 'week') {
    setLocaleDayOfWeek(_date, 0, {isUTC});
  }
  if (unit === 'isoWeek') {
    setISODayOfWeek(_date, 1);
  }

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
    // below an hour the elapsed part is subtracted instead of set to 0: a setter resolves the wall clock
    // time again, and inside the hour repeated when DST ends that jumps back to its first pass
    /* falls through */
    case 'hours':
      rewind(_date, getMinutes(_date, isUTC) * 60000);
    /* falls through */
    case 'minutes':
      rewind(_date, getSeconds(_date, isUTC) * 1000);
    /* falls through */
    case 'seconds':
      rewind(_date, getMilliseconds(_date, isUTC));
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
  // a calendar unit is added by wall clock time, so when `start` is not midnight
  // (DST skipped it) the step has to be moved back to the start of its own unit
  const next = timeUnits.includes(_unit) ? _step : startOf(_step, _unit, isUTC);
  const res = subtract(next, 1, 'milliseconds', isUTC);

  return res;
}
