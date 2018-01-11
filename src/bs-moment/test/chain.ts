// tslint:disable:max-line-length max-file-line-count
import { add, parseDate, subtract } from '../index';
import { DateArray, DateObject, UnitOfTime } from '../types';
import {
  getDate, getFullYear, getHours, getMilliseconds, getMinutes, getMonth, getSeconds,
  getUnixTime
} from '../utils/date-getters';
import {
  setDate, setFullYear, setHours, setMilliseconds, setMinutes, setMonth,
  setSeconds
} from '../utils/date-setters';
import { cloneDate } from '../create/clone';
import {
  isArray,
  isBoolean, isDate, isDateValid, isFunction, isNumber, isObject, isString,
  isUndefined
} from '../utils/type-checks';
import { formatDate } from '../format';
import { ISO_8601, RFC_2822 } from '../create/from-string-and-format';
import { Locale, LocaleData } from '../locale/locale.class';
import {
  getDateOffset,
  getUTCOffset, hasAlignedHourOffset, isDaylightSavingTime, setOffsetToParsedOffset,
  setUTCOffset
} from '../units/offset';
import { isLeapYear, parseTwoDigitYear } from '../units/year';
import { isAfter, isBefore, isBetween, isSame, isSameOrAfter, isSameOrBefore } from '../utils/date-compare';
import { daysInMonth } from '../units/month';
import {
  getDayOfWeek, getISODayOfWeek, getLocaleDayOfWeek, parseWeekday, setDayOfWeek, setISODayOfWeek,
  setLocaleDayOfWeek
} from '../units/day-of-week';
import { getISOWeek, getWeek, setISOWeek, setWeek } from '../units/week';
import {
  getISOWeeksInYear, getISOWeekYear, getSetISOWeekYear, getSetWeekYear, getWeeksInYear,
  getWeekYear
} from '../units/week-year';
import { endOf, startOf } from '../utils/start-end-of';
import { getQuarter, setQuarter } from '../units/quarter';
import { getDayOfYear, setDayOfYear } from '../units/day-of-year';
import { getZoneAbbr, getZoneName } from '../units/timezone';
import { diff } from '../moment/diff';
import { DateParsingConfig } from '../create/parsing.types';
import { calendar, CalendarSpec } from '../moment/calendar';
import { defineLocale, getLocale, getSetGlobalLocale, listLocales } from '../locale/locales';
import { max, min } from '../moment/min-max';
import { Duration, isDuration } from '../duration/constructor';
import { createLocalOrUTC } from '../create/from-anything';
import { createDuration } from '../duration/create';

export type DateInput = string | number | Date | string[] | DateArray | MomentInputObject;

export const moment: MomentFn = (_moment as MomentFn);

export interface MomentFn {
  (input?: DateInput | Khronos, format?: string | string[], localeKey?: string | boolean, strict?: boolean, isUTC?: boolean): Khronos;

  ISO_8601: string;
  RFC_2822: string;

  utc(input?: DateInput | Khronos, format?: string | string[], localeKey?: string | boolean, strict?: boolean): Khronos;

  parseZone(input?: DateInput | Khronos, format?: string | string[], localeKey?: string | boolean, strict?: boolean): Khronos;

  unix(num: number): Khronos;

  locale(key?: string | string[], values?: LocaleData): string;

  duration(inp?: Duration | DateInput | Khronos, unit?: MomentUnitOfTime): Duration;

  defineLocale(name: string, config?: LocaleData): Locale;

  parseTwoDigitYear(input: string): number;

  isDate(input?: any): input is Date;

  months(): string[];

  months(index: number): string;

  months(format: string): string[];

  months(format: string, index: number): string;

  monthsShort(): string[];

  monthsShort(index: number): string;

  monthsShort(format: string): string[];

  monthsShort(format: string, index: number): string;

  weekdays(): string[];

  weekdays(index: number): string;

  weekdays(format: string): string[];

  weekdays(format: string, index: number): string;

  weekdays(localeSorted: boolean): string[];

  weekdays(localeSorted: boolean, index: number): string;

  weekdays(localeSorted: boolean, format: string): string[];

  weekdays(localeSorted: boolean, format: string, index: number): string;

  weekdaysShort(): string[];

  weekdaysShort(index: number): string;

  weekdaysShort(format: string): string[];

  weekdaysShort(format: string, index: number): string;

  weekdaysShort(localeSorted: boolean): string[];

  weekdaysShort(localeSorted: boolean, index: number): string;

  weekdaysShort(localeSorted: boolean, format: string): string[];

  weekdaysShort(localeSorted: boolean, format: string, index: number): string;

  weekdaysMin(): string[];

  weekdaysMin(index: number): string;

  weekdaysMin(format: string): string[];

  weekdaysMin(format: string, index: number): string;

  weekdaysMin(localeSorted: boolean): string[];

  weekdaysMin(localeSorted: boolean, index: number): string;

  weekdaysMin(localeSorted: boolean, format: string): string[];

  weekdaysMin(localeSorted: boolean, format: string, index: number): string;

  relativeTimeThreshold(threshold: string): number | boolean;

  relativeTimeThreshold(threshold: string, limit: number): boolean;

  min(...dates: ((DateInput | Khronos)[] | (DateInput | Khronos))[]): Khronos;

  max(...dates: ((DateInput | Khronos)[] | (DateInput | Khronos))[]): Khronos;

  localeData(key?: string | string[] | Khronos): Locale;

  updateLocale(language: string, localeSpec?: LocaleData): Locale;

  calendarFormat(m: Date, now: Date): string;

  // todo: remove this
  calendarFormat(m: Khronos, now: Khronos): string;

  // todo: implement
  invalid(): Khronos;

  locales(): string[];

  // todo: implement
  updateOffset(m: Khronos, keepTime?: boolean): void;
}

function _moment(input?: DateInput | Khronos, format?: string | string[], localeKey?: string | boolean, strict?: boolean, isUTC?: boolean): Khronos {
  if (input instanceof Khronos) {
    const _date = input.clone();

    return isUTC ? _date.utc() : _date;
  }

  if (isBoolean(localeKey)) {
    return new Khronos(input, format, null, localeKey, isUTC);
  }

  return new Khronos(input, format, localeKey, strict, isUTC);
}

moment.utc = (input?: DateInput | Khronos, format?: string, localeKey?: string | boolean, strict?: boolean): Khronos => {
  return _moment(input, format, localeKey, strict, true);
};

moment.parseZone = (input?: DateInput | Khronos, format?: string, localeKey?: string | boolean, strict?: boolean): Khronos => {
  return _moment(input, format, localeKey, strict, true).parseZone();
};

moment.locale = getSetGlobalLocale;
moment.localeData = (key?: string | string[] | Khronos): Locale => {
  if (key instanceof Khronos) {
    return key.localeData();
  }

  return getLocale(key);
};

// moment.utc = createUTC;
moment.unix = (inp: number) => new Khronos(inp * 1000);
moment.ISO_8601 = ISO_8601;
moment.RFC_2822 = RFC_2822;
moment.defineLocale = defineLocale;
moment.parseTwoDigitYear = parseTwoDigitYear;
moment.isDate = isDate;
moment.invalid = function _invalid(): Khronos {
  return new Khronos(new Date(NaN));
};

// duration(inp?: Duration | DateInput | Khronos, unit?: MomentUnitOfTime): Duration;
moment.duration = (input?: Duration | DateInput | Khronos, unit?: MomentUnitOfTime): Duration => {
  const _unit = mapUnitOfTime(unit);
  if (isDate(input)) {
    throw new Error('todo implement');
  }

  if (input == null) {
    return createDuration();
  }

  if (isDuration(input)) {
    return createDuration(input, _unit, { _locale: input._locale });
  }

  if (isString(input) || isNumber(input) || isDuration(input) || isObject<DateObject>(input)) {
    return createDuration(input, _unit);
  }

  throw new Error('todo implement');
};

moment.min = function _min(...dates: ((DateInput | Khronos)[] | (DateInput | Khronos))[]): Khronos {
  const _firstArg = dates[0];
  const _dates = (isArray(_firstArg) ? _firstArg : dates)
  // tslint:disable-next-line
    .map((date: Khronos) => _moment(date))
    .map(date => date.toDate());

  const _date = min(..._dates);

  return new Khronos(_date);
};

moment.max = function _max(...dates: ((DateInput | Khronos)[] | (DateInput | Khronos))[]): Khronos {
  const _firstArg = dates[0];
  const _dates = (isArray(_firstArg) ? _firstArg : dates)
  // tslint:disable-next-line
    .map((date: Khronos) => _moment(date))
    .map(date => date.toDate());

  const _date = max(..._dates);

  return new Khronos(_date);
};

moment.locales = (): string[] => {
  return listLocales();
};

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

  w?: number;
  week?: number;
  weeks?: number;

  Q?: number;
  quarter?: number;
  quarters?: number;

  weekYear?: number;
}

export type MomentUnitOfTime = (
  'year' | 'years' | 'y' |
  'month' | 'months' | 'M' |
  'week' | 'weeks' | 'w' |
  'day' | 'days' | 'd' |
  'hour' | 'hours' | 'h' |
  'minute' | 'minutes' | 'm' |
  'second' | 'seconds' | 's' |
  'millisecond' | 'milliseconds' | 'ms' |
  'q' | 'quarter' | 'quarters' | 'Q' |
  'isoWeek' | 'isoWeeks' | 'W' |
  'date' | 'dates' | 'D'
  );

export type MomentAll = MomentUnitOfTime |
  'weekYear' | 'weekYears' | 'gg' |
  'isoWeekYear' | 'isoWeekYears' | 'GG' |
  'dayOfYear' | 'dayOfYears' | 'DDD' |
  'weekday' | 'weekdays' | 'e' |
  'isoWeekday' | 'isoWeekdays' | 'E';

const _unitsPriority: {[key in UnitOfTime]: number} = {
  year: 1,
  month: 8,
  week: 5,
  isoWeek: 5,
  day: 11,
  weekday: 11,
  isoWeekday: 11,
  hours: 13,
  weekYear: 1,
  isoWeekYear: 1,
  quarter: 7,
  date: 9,
  dayOfYear: 4,
  minutes: 14,
  seconds: 15,
  milliseconds: 16
};

// todo: do I need 2 mappers?
const _timeHashMap: { [key in MomentAll]: UnitOfTime | string } = {
  y: 'year',
  years: 'year',
  year: 'year',
  M: 'month',
  months: 'month',
  month: 'month',
  w: 'week',
  weeks: 'week',
  week: 'week',

  d: 'day',
  days: 'day',
  day: 'day',

  date: 'date',
  dates: 'date',
  D: 'date',

  h: 'hours',
  hour: 'hours',
  hours: 'hours',
  m: 'minutes',
  minute: 'minutes',
  minutes: 'minutes',
  s: 'seconds',
  second: 'seconds',
  seconds: 'seconds',
  ms: 'milliseconds',
  millisecond: 'milliseconds',
  milliseconds: 'milliseconds',
  quarter: 'quarter',
  quarters: 'quarter',
  q: 'quarter',
  Q: 'quarter',
  isoWeek: 'isoWeek',
  isoWeeks: 'isoWeek',
  W: 'isoWeek',
  weekYear: 'weekYear',
  weekYears: 'weekYear',
  gg: 'weekYears',
  isoWeekYear: 'isoWeekYear',
  isoWeekYears: 'isoWeekYear',
  GG: 'isoWeekYear',
  dayOfYear: 'dayOfYear',
  dayOfYears: 'dayOfYear',
  DDD: 'dayOfYear',
  weekday: 'weekday',
  weekdays: 'weekday',
  e: 'weekday',
  isoWeekday: 'isoWeekday',
  isoWeekdays: 'isoWeekday',
  E: 'isoWeekday'
};

function mapUnitOfTime(period: MomentAll): UnitOfTime {
  return _timeHashMap[period] as UnitOfTime;
}

function mapMomentInputObject(obj: MomentInputObject): {[key in UnitOfTime]?: number} {
  const _res: {[key in UnitOfTime]?: number} = {};

  return Object.keys(obj)
    .reduce((res, key: keyof MomentInputObject) => {
      res[mapUnitOfTime(key)] = obj[key];

      return res;
    }, _res);
}

export class Khronos {
  _date: Date = new Date();
  _isUTC = false;
  _isStrict: boolean;
  _locale: Locale;
  _format: string | string[];
  _offset: number;
  _tzm: number;

  constructor(input?: DateInput,
              format?: string | string[],
              localeKey?: string,
              strict = false,
              isUTC = false,
              offset?: number) {
    // locale will be needed to format invalid date message
    this._locale = getLocale(localeKey);
    // parse invalid input
    if (input === '' || input === null || (isNumber(input) && isNaN(input))) {
      this._date = new Date(NaN);

      return this;
    }

    this._isUTC = isUTC;
    if (this._isUTC) {
      this._offset = 0;
    }
    if (offset || offset === 0) {
      this._offset = offset;
    }
    this._isStrict = strict;
    this._format = format;

    if (!input && input !== 0 && !format) {
      this._date = new Date();

      return this;
    }

    if (isDate(input)) {
      this._date = cloneDate(input);

      return this;
    }

    // this._date = parseDate(input, format, localeKey, strict, isUTC);
    const config = createLocalOrUTC(input, format, localeKey, strict, isUTC);
    this._date = config._d;
    this._offset = config._offset;
    this._isUTC = config._isUTC;
    this._isStrict = config._strict;
    this._format = config._f;
    this._tzm = config._tzm;
  }

  _toConfig(): DateParsingConfig {
    return { _isUTC: this._isUTC, _locale: this._locale, _offset: this._offset, _tzm: this._tzm };
  }

  // Locale
  locale(): string;
  locale(localeKey: string | string[] | Khronos): Khronos;
  locale(localeKey?: string | string[] | Khronos): Khronos | string {
    if (isUndefined(localeKey)) {
      return this._locale._abbr;
    }

    if (localeKey instanceof Khronos) {
      this._locale = localeKey._locale;

      return this;
    }

    const newLocaleData = getLocale(localeKey);
    if (newLocaleData != null) {
      this._locale = newLocaleData;
    }

    return this;
  }

  localeData(): Locale {
    return this._locale;
  }

  // Basic

  add(val: number | string | MomentInputObject, period?: UnitOfTime | MomentUnitOfTime): Khronos {
    if (isString(val)) {
      this._date = add(this._date, parseInt(val, 10), mapUnitOfTime(period));
    }

    if (isNumber(val)) {
      this._date = add(this._date, val, mapUnitOfTime(period));
    }

    if (isObject<MomentInputObject>(val)) {
      const _mapped = mapMomentInputObject(val);
      Object.keys(_mapped)
        .forEach((key: UnitOfTime) => add(this._date, _mapped[key], key));
    }

    return this;
  }

  // fixme: for some reason here 'null' for time is fine
  calendar(time?: DateInput | Khronos, formats?: CalendarSpec): string {
    const _time = time instanceof Khronos ? time : new Khronos(time || new Date());
    const _offset = (this._offset || 0) - (_time._offset || 0);
    const _config = Object.assign(this._toConfig(), {_offset});

    return calendar(this._date, _time._date,
      formats, this._locale, _config);
  }

  clone(): Khronos {
    const localeKey = this._locale && this._locale._abbr || 'en';

    // return new Khronos(cloneDate(this._date), this._format, localeKey, this._isStrict, this._isUTC);
    // fails if isUTC and offset
    // return new Khronos(new Date(this.valueOf()),
    return new Khronos(this._date,
      this._format,
      localeKey,
      this._isStrict,
      this._isUTC,
      this._offset);
  }

  diff(b: DateInput | Khronos, unitOfTime?: MomentUnitOfTime, precise?: boolean): number {
    const unit = mapUnitOfTime(unitOfTime);
    const _b = b instanceof Khronos ? b : new Khronos(b);
    // const zoneDelta = (_b.utcOffset() - this.utcOffset());
    // const config = Object.assign(this._toConfig(), {
    //   _offset: 0,
    //   _isUTC: true,
    //   _zoneDelta: zoneDelta
    // });
    // return diff(new Date(this.valueOf()), new Date(_b.valueOf()), unit, precise, config);

    return diff(this._date, _b.toDate(), unit, precise, this._toConfig());
  }

  endOf(period?: MomentUnitOfTime): Khronos {
    const _per = mapUnitOfTime(period);
    this._date = endOf(this._date, _per, this._isUTC);

    return this;
  }

  format(format?: string): string {
    return formatDate(this._date, format, this._locale && this._locale._abbr, this._isUTC, this._offset);
  }

  // todo: implement
  from(time?: DateInput | Khronos, withoutSuffix?: boolean): string {
    const _time = _moment(time);
    if (this.isValid() && _time.isValid()) {
      return createDuration({ to: this.toDate(), from: _time.toDate() })
        .locale(this.locale())
        .humanize(!withoutSuffix);
    }

    return this.localeData().invalidDate;
  }

  fromNow(withoutSuffix?: boolean): string {
    return this.from(new Date(), withoutSuffix);
  }

  to(inp: DateInput | Khronos, suffix?: boolean): string {
    throw new Error(`TODO: Implement`);
  }

  toNow(withoutPrefix?: boolean): string {
    throw new Error(`TODO: Implement`);
  }

  subtract(val: number | string | MomentInputObject, period?: UnitOfTime | MomentUnitOfTime): Khronos {
    if (isString(val)) {
      this._date = subtract(this._date, parseInt(val, 10), mapUnitOfTime(period));

      return this;
    }

    if (isNumber(val)) {
      this._date = subtract(this._date, val, mapUnitOfTime(period));
    }

    if (isObject<MomentInputObject>(val)) {
      const _mapped = mapMomentInputObject(val);
      Object.keys(_mapped)
        .forEach((key: UnitOfTime) => subtract(this._date, _mapped[key], key));
    }

    return this;
  }

  get(period: MomentAll): number {
    if (period === 'dayOfYear') {
      return this.dayOfYear();
    }

    const unit = mapUnitOfTime(period);
    switch (unit) {
      case 'year':
        return this.year();
      case 'month':
        return this.month();
      // | 'week'
      case 'date':
        return this.date();
      case 'day':
        return this.day();
      case 'hours':
        return this.hours();
      case 'minutes':
        return this.minutes();
      case 'seconds':
        return this.seconds();
      case 'milliseconds':
        return this.milliseconds();
      case 'week':
        return this.week();
      case 'isoWeek':
        return this.isoWeek();
      case 'weekYear':
        return this.weekYear();
      case 'isoWeekYear':
        return this.isoWeekYear();
      case 'weekday':
        return this.weekday();
      case 'isoWeekday':
        return this.isoWeekday();
      case 'quarter':
        return this.quarter();
      default:
        throw new Error(`Unknown moment.get('${period}')`);
    }
  }

  set(period: MomentAll | MomentInputObject, input?: number): Khronos {

    if (isString(period)) {
      const unit = mapUnitOfTime(period);
      switch (unit) {
        case 'year':
          return this.year(input);
        case 'month':
          return this.month(input);
        // | 'week'
        case 'day':
          return this.day(input);
        case 'date':
          return this.date(input);
        case 'hours':
          return this.hours(input);
        case 'minutes':
          return this.minutes(input);
        case 'seconds':
          return this.seconds(input);
        case 'milliseconds':
          return this.milliseconds(input);
        case 'week':
          return this.week(input);
        case 'isoWeek':
          return this.isoWeek(input);
        case 'weekYear':
          return this.weekYear(input);
        case 'isoWeekYear':
          return this.isoWeekYear(input);
        case 'weekday':
          return this.weekday(input);
        case 'isoWeekday':
          return this.isoWeekday(input);
        case 'quarter':
          return this.quarter(input);
        default:
          throw new Error(`Unknown moment.get('${period}')`);
      }
    }

    if (isObject<MomentInputObject>(period)) {
      const _mapped = mapMomentInputObject(period);
      Object.keys(_mapped)
        .sort(function (a: UnitOfTime, b: UnitOfTime): number {
          return _unitsPriority[a] - _unitsPriority[b];
        })
        .forEach((key: UnitOfTime) => this.set(key, _mapped[key]));
    }


    return this;
  }

  toString(): string {
    return this.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }

  toISOString(): string {
    if (!this.isValid()) {
      return null;
    }

    if (getFullYear(this._date, true) < 0 || getFullYear(this._date, true) > 9999) {
      return this.format('YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }

    if (isFunction(Date.prototype.toISOString)) {
      // native implementation is ~50x faster, use it when we can
      return this.toDate().toISOString();
    }

    return this.format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
  }

  inspect(): string {
    throw new Error('TODO: implement');
  }

  toJSON(): string {
    return this.toISOString();
  }

  toDate(): Date {
    return new Date(this.valueOf());
  }

  toObject(): {[key in MomentUnitOfTime]?: number} {
    return {
      // years: getFullYear(this._date, this._isUTC),
      // months: getMonth(this._date, this._isUTC),

      year: getFullYear(this._date, this._isUTC),
      month: getMonth(this._date, this._isUTC),
      date: getDate(this._date, this._isUTC),
      hours: getHours(this._date, this._isUTC),
      minutes: getMinutes(this._date, this._isUTC),
      seconds: getSeconds(this._date, this._isUTC),
      milliseconds: getMilliseconds(this._date, this._isUTC)
    };
  }

  toArray(): DateArray {
    return [this.year(), this.month(), this.date(), this.hour(), this.minute(), this.second(), this.millisecond()];
  }


  // Dates boolean algebra

  isAfter(date: Khronos, unit?: MomentUnitOfTime): boolean {
    const _unit = unit ? mapUnitOfTime(unit) : void 0;

    return isAfter(this._date, date.toDate(), _unit);
  }

  isBefore(date: Khronos, unit?: MomentUnitOfTime): boolean {
    const _unit = unit ? mapUnitOfTime(unit) : void 0;

    return isBefore(this.toDate(), date.toDate(), _unit);
  }

  isBetween(from: Khronos, to: Khronos, unit?: MomentUnitOfTime, inclusivity?: string): boolean {
    const _unit = unit ? mapUnitOfTime(unit) : void 0;

    return isBetween(this.toDate(), from.toDate(), to.toDate(), _unit, inclusivity);
  }

  isSame(date: Khronos, unit?: MomentUnitOfTime): boolean {
    const _unit = unit ? mapUnitOfTime(unit) : void 0;

    return isSame(this._date, date.toDate(), _unit);
  }

  isSameOrAfter(date: Khronos, unit?: MomentUnitOfTime): boolean {
    const _unit = unit ? mapUnitOfTime(unit) : void 0;

    return isSameOrAfter(this._date, date.toDate(), _unit);
  }

  isSameOrBefore(date: Khronos, unit?: MomentUnitOfTime): boolean {
    const _unit = unit ? mapUnitOfTime(unit) : void 0;

    return isSameOrBefore(this._date, date.toDate(), _unit);
  }

  isValid(): boolean {
    return isDateValid(this._date);
  }

  valueOf(): number {
    return this._date.valueOf() - ((this._offset || 0) * 60000);
  }

  unix(): number {
    // return getUnixTime(this._date);
    return Math.floor(this.valueOf() / 1000);
  }


  // Offset

  utcOffset(): number;
  utcOffset(b: number | string, keepLocalTime?: boolean): Khronos;
  utcOffset(b?: number | string, keepLocalTime?: boolean): number | Khronos {
    const _config = this._toConfig();

    if (!b && b !== 0) {
      return getUTCOffset(this._date, _config);
    }

    this._date = setUTCOffset(this._date, b, keepLocalTime, false, _config);

    this._offset = _config._offset;
    this._isUTC = _config._isUTC;

    return this;
  }

  utc(keepLocalTime?: boolean): Khronos {
    return this.utcOffset(0, keepLocalTime);
  }

  local(keepLocalTime?: boolean): Khronos {
    if (this._isUTC) {
      this.utcOffset(0, keepLocalTime);
      this._isUTC = false;

      if (keepLocalTime) {
        this.subtract(getDateOffset(this._date), 'm');
      }
    }

    return this;
  }

  parseZone(input?: string): Khronos {
    const _config = this._toConfig();
    this._date = setOffsetToParsedOffset(this._date, input, _config);

    this._offset = _config._offset;
    this._isUTC = _config._isUTC;

    return this;
  }

  hasAlignedHourOffset(input?: Khronos): boolean {
    return hasAlignedHourOffset(this._date, input ? input._date : void 0);
  }

  isDST(): boolean {
    return isDaylightSavingTime(this._date);
  }

  isLocal(): boolean {
    return !this._isUTC;
  }

  isUtcOffset(): boolean {
    return this._isUTC;
  }

  isUTC(): boolean {
    return this.isUtc();
  }

  isUtc(): boolean {
    return this._isUTC && this._offset === 0;
  }

  // Timezone

  zoneAbbr(): string {
    return getZoneAbbr(this._isUTC);
  }

  zoneName(): string {
    return getZoneName(this._isUTC);
  }

  // Year

  year(): number;
  year(year: number): Khronos;
  year(year?: number): Khronos | number {
    if (!year && year !== 0) {
      return getFullYear(this._date, this._isUTC);
    }

    this._date = cloneDate(setFullYear(this._date, year));

    return this;
  }

  weekYear(): number;
  weekYear(val: number): Khronos;
  weekYear(val?: number): Khronos | number {
    if (!val && val !== 0) {
      return getWeekYear(this._date, this._locale);
    }

    const date = getSetWeekYear(this._date, val, this._locale);
    if (isDate(date)) {
      this._date = date;
    }

    return this;
  }

  isoWeekYear(): number ;
  isoWeekYear(val: number): Khronos ;
  isoWeekYear(val?: number): Khronos | number {
    if (!val && val !== 0) {
      return getISOWeekYear(this._date);
    }

    const date = getSetISOWeekYear(this._date, val);

    if (isDate(date)) {
      this._date = date;
    }

    return this;
  }

  isLeapYear(): boolean {
    return isLeapYear(getFullYear(this.toDate(), this.isUTC()));
  }

  // Month

  month(): number;
  month(month: number | string): Khronos;
  month(month?: number | string): Khronos | number {
    if (!month && month !== 0) {
      return getMonth(this._date, this._isUTC);
    }

    let _month = month;

    if (isString(month)) {
      const locale = this._locale || getLocale();
      _month = locale.monthsParse(month);
    }

    if (isNumber(_month)) {
      this._date = cloneDate(setMonth(this._date, _month, this._isUTC));
    }

    return this;
  }

  /** @deprecated */
  hour(): number;
  hour(hours: number): Khronos;
  hour(hours?: number): Khronos | number {
    return this.hours(hours);
  }

  hours(): number;
  hours(hours: number): Khronos;
  hours(hours?: number): Khronos | number {
    if (!hours && hours !== 0) {
      return getHours(this._date, this._isUTC);
    }

    this._date = cloneDate(setHours(this._date, hours, this._isUTC));

    return this;
  }

  /** @deprecated */
  minute(): number;
  minute(minutes: number): Khronos;
  minute(minutes?: number): Khronos | number {
    return this.minutes(minutes);
  }

  minutes(): number;
  minutes(minutes: number): Khronos;
  minutes(minutes?: number): Khronos | number {
    if (!minutes && minutes !== 0) {
      return getMinutes(this._date, this._isUTC);
    }

    this._date = cloneDate(setMinutes(this._date, minutes, this._isUTC));

    return this;
  }

  /** @deprecated */
  second(): number;
  second(seconds: number): Khronos;
  second(seconds?: number): Khronos | number {
    return this.seconds(seconds);
  }

  seconds(): number;
  seconds(seconds: number): Khronos;
  seconds(seconds?: number): Khronos | number {
    if (!seconds && seconds !== 0) {
      return getSeconds(this._date, this._isUTC);
    }

    this._date = cloneDate(setSeconds(this._date, seconds, this._isUTC));

    return this;
  }

  /** @deprecated */
  millisecond(): number;
  millisecond(ms: number): Khronos;
  millisecond(ms?: number): Khronos | number {
    return this.milliseconds(ms);
  }

  milliseconds(): number;
  milliseconds(seconds: number): Khronos;
  milliseconds(seconds?: number): Khronos | number {
    if (!seconds && seconds !== 0) {
      return getMilliseconds(this._date, this._isUTC);
    }

    this._date = cloneDate(setMilliseconds(this._date, seconds, this._isUTC));

    return this;
  }

  // Day

  date(): number;
  date(date: number): Khronos;
  date(date?: number): Khronos | number {
    if (!date && date !== 0) {
      return getDate(this._date, this._isUTC);
    }

    this._date = cloneDate(setDate(this._date, date, this._isUTC));

    return this;
  }

  day(): number ;
  day(input: number | string): Khronos ;
  day(input?: number | string): Khronos | number {
    if (!input && input !== 0) {
      return getDayOfWeek(this._date, this._isUTC);
    }

    let _input = input;

    if (isString(input)) {
      _input = parseWeekday(input, this._locale);
    }

    if (isNumber(_input)) {
      this._date = setDayOfWeek(this._date, _input, this._locale, this._isUTC);
    }

    return this;
  }

  weekday(): number ;
  weekday(val: number): Khronos ;
  weekday(val?: number): Khronos | number {
    if (!val && val !== 0) {
      return getLocaleDayOfWeek(this._date, this._locale, this._isUTC);
    }

    this._date = setLocaleDayOfWeek(this._date, val, { locale: this._locale, isUTC: this._isUTC });

    return this;
  }

  isoWeekday(): number ;
  isoWeekday(val: number | string): Khronos ;
  isoWeekday(val?: number | string): Khronos | number {
    if (!val && val !== 0) {
      return getISODayOfWeek(this._date);
    }

    this._date = setISODayOfWeek(this._date, val);

    return this;
  }

  dayOfYear(): number;
  dayOfYear(val: number): Khronos;
  dayOfYear(val?: number): Khronos | number {
    if (!val && val !== 0) {
      return getDayOfYear(this._date);
    }

    this._date = setDayOfYear(this._date, val);

    return this;
  }

  // Week

  week(): number;
  week(input: number): Khronos;
  week(input?: number): Khronos | number {
    if (!input && input !== 0) {
      return getWeek(this._date, this._locale);
    }

    this._date = setWeek(this._date, input, this._locale);

    return this;
  }

  /** @deprecated */
  weeks(): number;
  weeks(input: number): Khronos;
  weeks(input?: number): Khronos | number {
    return this.week(input);
  }

  isoWeek(): number ;
  isoWeek(val: number): Khronos ;
  isoWeek(val?: number): Khronos | number {
    if (!val && val !== 0) {
      return getISOWeek(this._date);
    }

    this._date = setISOWeek(this._date, val);

    return this;
  }

  /** @deprecated */
  isoWeeks(): number ;
  isoWeeks(val: number): Khronos ;
  isoWeeks(val?: number): Khronos | number {
    return this.isoWeek(val);
  }

  weeksInYear(): number {
    return getWeeksInYear(this._date, this._isUTC, this._locale);
  }

  isoWeeksInYear(): number {
    return getISOWeeksInYear(this._date, this._isUTC);
  }


  daysInMonth(): number {
    return daysInMonth(getFullYear(this._date, this._isUTC), getMonth(this._date, this._isUTC));
  }


  quarter(): number;
  quarter(val: number): Khronos;
  quarter(val?: number): Khronos | number {
    if (!val && val !== 0) {
      return getQuarter(this._date, this._isUTC);
    }

    this._date = setQuarter(this._date, val, this._isUTC);

    return this;
  }

  /** @deprecated */
  quarters(): number;
  quarters(val: number): Khronos;
  quarters(val?: number): Khronos | number {
    return this.quarter(val);
  }

  startOf(period?: MomentUnitOfTime): Khronos {
    const _per = mapUnitOfTime(period);
    this._date = startOf(this._date, _per, this._isUTC);

    return this;
  }

}
