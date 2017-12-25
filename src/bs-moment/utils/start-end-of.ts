// tslint:disable: switch-default
import { TimeUnit, UnitOfTime } from '../types';
import { setFullDate, shiftDate } from './date-setters';

export function startOf(date: Date, units: UnitOfTime): Date {
  const unit = getDateShift(units);

  return setFullDate(date, unit);
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
    case 'hours':
      unit.minute = 0;
    /* falls through */
    case 'minutes':
      unit.seconds = 0;
    /* falls through */
    case 'seconds':
      unit.milliseconds = 0;
    //   this.milliseconds(0);
  }

  return unit;
}
