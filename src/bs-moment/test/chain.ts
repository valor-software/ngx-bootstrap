// tslint:disable:max-line-length max-file-line-count
import { parseDate, add, subtract } from '../index';
import { DateArray, DateObject, UnitOfTime } from '../types';
import {
  getDate, getFullYear, getHours, getMilliseconds, getMinutes, getMonth,
  getSeconds, getUnixTime
} from '../utils/date-getters';
import {
  setDate, setFullYear, setHours, setMilliseconds, setMinutes, setMonth,
  setSeconds
} from '../utils/date-setters';
import { cloneDate } from '../create/clone';
import { isBoolean, isDate, isDateValid, isNumber, isObject, isString } from '../utils/type-checks';
import { formatDate } from '../format';
import { ISO_8601, RFC_2822 } from '../create/from-string-and-format';
import { defineLocale, getSetGlobalLocale } from '../locale/locales.service';
import { Locale, LocaleData } from '../locale/locale.class';
import { getUTCOffset, setUTCOffset } from '../units/offset';
import { parseTwoDigitYear } from '../units/year';
import { isSame } from '../utils/date-compare';
import { createInvalid } from '../create/valid';

export type DateInput = string | number | DateArray | MomentInputObject | Date;

export const moment: MomentFn = (_moment as MomentFn);

export interface MomentFn {
  (input?: DateInput | Khronos, format?: string | string[], localeKey?: string | boolean, strict?: boolean, isUTC?: boolean): Khronos;

  ISO_8601: string;
  RFC_2822: string;

  utc(input?: DateInput, format?: string | string[], localeKey?: string | boolean, strict?: boolean): Khronos;

  unix(num: number): Khronos;

  locale(key: string, values?: LocaleData): string;

  defineLocale(name: string, config?: LocaleData): Locale;

  parseTwoDigitYear(input: string): number;
}

function _moment(input?: DateInput | Khronos, format?: string | string[], localeKey?: string | boolean, strict?: boolean, isUTC?: boolean): Khronos {
  const _input = input instanceof Khronos ? input.toDate() : input;
  if (isBoolean(localeKey)) {
    return new Khronos(_input, format, null, localeKey, isUTC);
  }

  return new Khronos(_input, format, localeKey, strict, isUTC);
}

moment.utc = (input?: DateInput, format?: string, localeKey?: string | boolean, strict?: boolean): Khronos => {
  return _moment(input, format, localeKey, strict, true);
};

// moment.utc = createUTC;
moment.unix = (inp: number) => new Khronos(inp * 1000);
moment.ISO_8601 = ISO_8601;
moment.RFC_2822 = RFC_2822;
moment.locale = getSetGlobalLocale;
moment.defineLocale = defineLocale;
moment.parseTwoDigitYear = parseTwoDigitYear;

export interface MomentInputObject {
  years?: number;
  year?: number;
  y?: number;

  months?: number;
  month?: number;
  M?: number;

  days?: number;
  day?: number;
  d?: number;

  dates?: number;
  date?: number;
  D?: number;

  hours?: number;
  hour?: number;
  h?: number;

  minutes?: number;
  minute?: number;
  m?: number;

  seconds?: number;
  second?: number;
  s?: number;

  milliseconds?: number;
  millisecond?: number;
  ms?: number;
}

export type MomentUnitOfTime = (
  'year' | 'years' | 'y' |
  'month' | 'months' | 'M' |
  'week' | 'weeks' | 'w' |
  'day' | 'days' | 'd' |
  'hour' | 'hours' | 'h' |
  'minute' | 'minutes' | 'm' |
  'second' | 'seconds' | 's' |
  'millisecond' | 'milliseconds' | 'ms'
  );

const _timeHashMap: { [key: string]: UnitOfTime } = {
  y: 'year',
  years: 'year',
  M: 'month',
  months: 'month',
  w: 'week',
  weeks: 'week',
  d: 'day',
  days: 'day',
  h: 'hours',
  hour: 'hours',
  m: 'minutes',
  minute: 'minutes',
  s: 'seconds',
  second: 'seconds',
  ms: 'milliseconds',
  millisecond: 'milliseconds'
};

function mapUnitOfTime(period: MomentUnitOfTime): UnitOfTime {
  return _timeHashMap[period];
}

export class Khronos {
  _date: Date = new Date();

  constructor(input?: DateInput, format?: string | string[], localeKey?: string, strict?: boolean, isUTC?: boolean) {
    if (!input && !format) {
      this._date = new Date();
    } else if (isDate(input)) {
      this._date = cloneDate(input);
    } else {
      this._date = parseDate(input, format, localeKey, strict, isUTC);
    }
  }

  add(val: number | string | MomentInputObject, period?: UnitOfTime | MomentUnitOfTime): Khronos {
    if (isString(val)) {
      this._date = add(this._date, parseInt(val, 10), mapUnitOfTime(period));
    }

    if (isNumber(val)) {
      this._date = add(this._date, val, mapUnitOfTime(period));
    }

    if (isObject<MomentInputObject>(val)) {
      if (val.ms) {
        this._date = add(this._date, val.ms, 'milliseconds');
      }
      if (val.s) {
        this._date = add(this._date, val.s, 'seconds');
      }
      if (val.m) {
        this._date = add(this._date, val.m, 'minutes');
      }
      if (val.h) {
        this._date = add(this._date, val.h, 'hours');
      }
      if (val.d) {
        this._date = add(this._date, val.d, 'day');
      }
      if (val.M) {
        this._date = add(this._date, val.M, 'month');
      }
      if (val.s) {
        this._date = add(this._date, val.y, 'year');
      }
    }

    return this;
  }

  subtract(val: number | string | MomentInputObject, period?: UnitOfTime | MomentUnitOfTime): Khronos {
    if (isString(val)) {
      this._date = add(this._date, parseInt(val, 10), mapUnitOfTime(period));
    }

    if (isNumber(val)) {
      this._date = subtract(this._date, val, mapUnitOfTime(period));
    }

    if (isObject<MomentInputObject>(val)) {
      if (val.ms) {
        this._date = subtract(this._date, val.ms, 'milliseconds');
      }
      if (val.s) {
        this._date = subtract(this._date, val.s, 'seconds');
      }
      if (val.m) {
        this._date = subtract(this._date, val.m, 'minutes');
      }
      if (val.h) {
        this._date = subtract(this._date, val.h, 'hours');
      }
      if (val.d) {
        this._date = subtract(this._date, val.d, 'day');
      }
      if (val.M) {
        this._date = subtract(this._date, val.M, 'month');
      }
      if (val.s) {
        this._date = subtract(this._date, val.y, 'year');
      }
    }


    return this;
  }

  get(period: MomentUnitOfTime): number {
    const unit = mapUnitOfTime(period);
    switch (unit) {
      case 'year':
        return this.year();
      case 'month':
        return this.month();
      // | 'week'
      case 'day':
        return this.date();
      case 'hours':
        return this.hours();
      case 'minutes':
        return this.minutes();
      case 'seconds':
        return this.seconds();
      case 'milliseconds':
        return this.milliseconds();
      default:
        throw new Error(`Unknown moment.get('${period}')`);
    }
  }

  format(format?: string): string {
    return formatDate(this._date, format);
  }

  toString(): string {
    return this.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }

  toISOString(keepOffset?: boolean): string {
    return this.format('YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
  }

  toDate(): Date {
    return this._date;
  }

  isSame(date: Khronos): boolean {
    return isSame(this._date, date.toDate());
  }

  isValid(): boolean {
    return isDateValid(this._date);
  }

  valueOf(): number {
    return this._date.valueOf();
  }

  clone(): Khronos {
    return new Khronos(cloneDate(this._date));
  }

  unix(): number {
    return getUnixTime(this._date);
  }

  /** implement */
  utc(): Khronos {
    return this;
  }

  utcOffset(): number;
  utcOffset(b?: number, keepLocalTime?: boolean): number | Khronos {
    if (!b) {
      return getUTCOffset(this._date);
    }

    this._date = setUTCOffset(this._date, b, keepLocalTime);

    return this;
  }

  year(): number;
  year(year: number): Khronos;
  year(year?: number): Khronos | number {
    if (!year && year !== 0) {
      return getFullYear(this._date);
    }

    this._date = cloneDate(setFullYear(this._date, year));

    return this;
  }

  month(): number;
  month(month: number): Khronos;
  month(month?: number): Khronos | number {
    if (!month && month !== 0) {
      return getMonth(this._date);
    }

    this._date = cloneDate(setMonth(this._date, month));

    return this;
  }

  date(): number;
  date(date: number): Khronos;
  date(date?: number): Khronos | number {
    if (!date && date !== 0) {
      return getDate(this._date);
    }

    this._date = cloneDate(setDate(this._date, date));

    return this;
  }

  hours(): number;
  hours(hours: number): Khronos;
  hours(hours?: number): Khronos | number {
    if (!hours && hours !== 0) {
      return getHours(this._date);
    }

    this._date = cloneDate(setHours(this._date, hours));

    return this;
  }

  minutes(): number;
  minutes(minutes: number): Khronos;
  minutes(minutes?: number): Khronos | number {
    if (!minutes && minutes !== 0) {
      return getMinutes(this._date);
    }

    this._date = cloneDate(setMinutes(this._date, minutes));

    return this;
  }

  seconds(): number;
  seconds(seconds: number): Khronos;
  seconds(seconds?: number): Khronos | number {
    if (!seconds && seconds !== 0) {
      return getSeconds(this._date);
    }

    this._date = cloneDate(setSeconds(this._date, seconds));

    return this;
  }

  milliseconds(): number;
  milliseconds(seconds: number): Khronos;
  milliseconds(seconds?: number): Khronos | number {
    if (!seconds && seconds !== 0) {
      return getMilliseconds(this._date);
    }

    this._date = cloneDate(setMilliseconds(this._date, seconds));

    return this;
  }
}
