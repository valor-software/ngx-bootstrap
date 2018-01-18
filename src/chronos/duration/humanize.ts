// tslint:disable:cyclomatic-complexity
import { createDuration } from './create';
import { Locale } from '../locale/locale.class';
import { Duration } from './constructor';

let round = Math.round;
const thresholds: { [key: string]: number } = {
  ss: 44,         // a few seconds to seconds
  s: 45,         // seconds to minute
  m: 45,         // minutes to hour
  h: 22,         // hours to day
  d: 26,         // days to month
  M: 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(str: 'future' | 'past', num: number,
                           withoutSuffix: boolean, isFuture: boolean,
                           locale: Locale): string {
  return locale.relativeTime(num || 1, !!withoutSuffix, str, isFuture);
}

export function relativeTime(posNegDuration: Duration, withoutSuffix: boolean, locale: Locale): string {
  const duration = createDuration(posNegDuration).abs();
  const seconds = round(duration.as('s'));
  const minutes = round(duration.as('m'));
  const hours = round(duration.as('h'));
  const days = round(duration.as('d'));
  const months = round(duration.as('M'));
  const years = round(duration.as('y'));

  const a: [string] | [string, number] =
    seconds <= thresholds.ss && ['s', seconds] ||
    seconds < thresholds.s && ['ss', seconds] ||
    minutes <= 1 && ['m'] ||
    minutes < thresholds.m && ['mm', minutes] ||
    hours <= 1 && ['h'] ||
    hours < thresholds.h && ['hh', hours] ||
    days <= 1 && ['d'] ||
    days < thresholds.d && ['dd', days] ||
    months <= 1 && ['M'] ||
    months < thresholds.M && ['MM', months] ||
    years <= 1 && ['y'] || ['yy', years];

  const b: [string, number | string, boolean, boolean, Locale] =
    [a[0], a[1], withoutSuffix, +posNegDuration > 0, locale];
  // a[2] = withoutSuffix;
  // a[3] = +posNegDuration > 0;
  // a[4] = locale;

  return substituteTimeAgo.apply(null, b);
}

// This function allows you to set the rounding function for relative time strings
export function getSetRelativeTimeRounding(roundingFunction: any): boolean | Function {
  if (roundingFunction === undefined) {
    return round;
  }
  if (typeof(roundingFunction) === 'function') {
    round = roundingFunction;

    return true;
  }

  return false;
}

// This function allows you to set a threshold for relative time strings
export function getSetRelativeTimeThreshold(threshold: string, limit: number): boolean | number {
  if (thresholds[threshold] === undefined) {
    return false;
  }
  if (limit === undefined) {
    return thresholds[threshold];
  }
  thresholds[threshold] = limit;
  if (threshold === 's') {
    thresholds.ss = limit - 1;
  }

  return true;
}

// export function humanize(withSuffix) {
//   if (!this.isValid()) {
//     return this.localeData().invalidDate();
//   }
//
//   const locale = this.localeData();
//   let output = relativeTime(this, !withSuffix, locale);
//
//   if (withSuffix) {
//     output = locale.pastFuture(+this, output);
//   }
//
//   return locale.postformat(output);
// }
