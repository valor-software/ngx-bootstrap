import { Duration } from './constructor';
import { absFloor } from '../utils';
import { absCeil } from '../utils/abs-ceil';

export function bubble(dur: Duration): Duration {
  let milliseconds = dur._milliseconds;
  let days = dur._days;
  let months = dur._months;
  const data = dur._data;

  // if we have a mix of positive and negative values, bubble down first
  // check: https://github.com/moment/moment/issues/2166
  if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
      (milliseconds <= 0 && days <= 0 && months <= 0))) {
    milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
    days = 0;
    months = 0;
  }

  // The following code bubbles up values, see the tests for
  // examples of what that means.
  data.milliseconds = milliseconds % 1000;

  const seconds = absFloor(milliseconds / 1000);
  data.seconds = seconds % 60;

  const minutes = absFloor(seconds / 60);
  data.minutes = minutes % 60;

  const hours = absFloor(minutes / 60);
  data.hours = hours % 24;

  days += absFloor(hours / 24);

  // convert days to months
  const monthsFromDays = absFloor(daysToMonths(days));
  months += monthsFromDays;
  days -= absCeil(monthsToDays(monthsFromDays));

  // 12 months -> 1 year
  const years = absFloor(months / 12);
  months %= 12;

  data.day = days;
  data.month = months;
  data.year = years;

  return dur;
}

export function daysToMonths(day: number): number {
  // 400 years have 146097 days (taking into account leap year rules)
  // 400 years have 12 months === 4800
  return day * 4800 / 146097;
}

export function monthsToDays(month: number): number {
  // the reverse of daysToMonths
  return month * 146097 / 4800;
}
