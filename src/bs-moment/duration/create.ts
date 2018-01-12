// ASP.NET json date format regex
import { Duration, isDuration } from './constructor';
import { isDateValid, isNumber, isObject, isString, toInt } from '../utils/type-checks';
import { DATE, HOUR, MILLISECOND, MINUTE, SECOND } from '../units/constants';
import { parseDate } from '../create/local';
import { absRound } from '../utils/abs-round';
import { DateObject } from '../types';
import { DateParsingConfig } from '../create/parsing.types';
import { cloneWithOffset } from '../units/offset';
import { isAfter, isBefore } from '../utils/date-compare';
import { getFullYear, getMonth } from '../utils/date-getters';
import { add } from '../moment/add-subtract';
import { cloneDate } from '../create/clone';

const aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
// tslint:disable-next-line
const isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

export type DurationInput = string | number | Duration | Partial<DateObject> | { from: Date; to: Date };

export function createDuration(input?: DurationInput, key?: string, config: DateParsingConfig = {}) {
  const duration = convertDuration(input, key);
  // matching against regexp is expensive, do it on demand

  return new Duration(duration, config);
}

function convertDuration(input: any, key: string): Partial<DateObject> {
  // checks for null or undefined
  if (input == null) {
    return {};
  }

  if (isDuration(input)) {
    return {
      milliseconds: input._milliseconds,
      day: input._days,
      month: input._months
    };
  }
  if (isNumber(input)) {
    // duration = {};
    return key ? { [key]: input } : { milliseconds: input };
  }

  if (isString(input)) {
    let match = aspNetRegex.exec(input);

    if (match) {
      const sign = (match[1] === '-') ? -1 : 1;

      return {
        year: 0,
        day: toInt(match[DATE]) * sign,
        hours: toInt(match[HOUR]) * sign,
        minutes: toInt(match[MINUTE]) * sign,
        seconds: toInt(match[SECOND]) * sign,
        // the millisecond decimal point is included in the match
        milliseconds: toInt(absRound(toInt(match[MILLISECOND]) * 1000)) * sign
      };
    }

    match = isoRegex.exec(input);
    if (match) {
      const sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;

      return {
        year: parseIso(match[2], sign),
        month: parseIso(match[3], sign),
        week: parseIso(match[4], sign),
        day: parseIso(match[5], sign),
        hours: parseIso(match[6], sign),
        minutes: parseIso(match[7], sign),
        seconds: parseIso(match[8], sign)
      };
    }

  }

  if (isObject<{from: any; to: any}>(input) && ('from' in input || 'to' in input)) {
    const diffRes = momentsDifference(parseDate(input.from), parseDate(input.to));

    return {
      milliseconds: diffRes.milliseconds,
      month: diffRes.months
    };
  }

  return input;
}

// createDuration.fn = Duration.prototype;
// createDuration.invalid = invalid;

function parseIso(inp: string, sign: number): number {
  // We'd normally use ~~inp for this, but unfortunately it also
  // converts floats to ints.
  // inp may be undefined, so careful calling replace on it.
  const res = inp && parseFloat(inp.replace(',', '.'));
  // apply sign while we're at it

  return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base: Date, other: Date): { milliseconds: number; months: number } {
  const res = { milliseconds: 0, months: 0 };

  res.months = getMonth(other) - getMonth(base) +
    (getFullYear(other) - getFullYear(base)) * 12;
  const _basePlus = add(cloneDate(base), res.months, 'month');
  if (isAfter(_basePlus, other)) {
    --res.months;
  }

  res.milliseconds = +other - +(add(cloneDate(base), res.months, 'month'));

  return res;
}

function momentsDifference(base: Date, other: Date): { milliseconds: number; months: number } {
  if (!(isDateValid(base) && isDateValid(other))) {
    return { milliseconds: 0, months: 0 };
  }

  let res;
  const _other = cloneWithOffset(other, base, {_offset: base.getTimezoneOffset()});
  if (isBefore(base, _other)) {
    res = positiveMomentsDifference(base, _other);
  } else {
    res = positiveMomentsDifference(_other, base);
    res.milliseconds = -res.milliseconds;
    res.months = -res.months;
  }

  return res;
}
