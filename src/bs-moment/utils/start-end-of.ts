import { TimeUnit, UnitOfTime } from '../types';
import { setDate, shiftDate } from './date-setters';

export function startOf(date: Date, units: UnitOfTime): Date {
  const unit = getDateShift(units);
  return setDate(date, unit);
}

export function endOf(date: Date, units: UnitOfTime): Date {
  const start = startOf(date, units);
  const shift = { [units]: 1 };
  const change = shiftDate(start, shift);
  change.setMilliseconds(-1);

  return change;
}

function getDateShift(units: UnitOfTime): TimeUnit {
  const unit: TimeUnit = {};
  switch (units) {
    case 'year':
      unit.month = 0;
    /* falls through */
    case 'month':
      unit.day = 1;
    /* falls through */
    case 'week':
    case 'day':
      unit.hour = 0;
    /* falls through */
    case 'hour':
      unit.minute = 0;
    /* falls through */
    case 'minute':
      unit.seconds = 0;
    /* falls through */
    // case 'second':
    //   this.milliseconds(0);
  }

  return unit;
}
