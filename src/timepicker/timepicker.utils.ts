import { Time } from './timepicker.models';

const dex = 10;
const hoursPerDay = 24;
const hoursPerDayHalf = 12;
const minutesPerHour = 60;
const secondsPerMinute = 60;

export function isValidDate(value?: string | Date): boolean {
  if (!value) {
    return false;
  }

  if (value instanceof Date && isNaN(value.getHours())) {
    return false;
  }

  if (typeof value === 'string') {
    return isValidDate(new Date(value));
  }

  return true;
}

export function toNumber(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  return parseInt(value, dex);
}

export function isNumber(value: string): boolean {
  return !isNaN(toNumber(value));
}

export function parseHours(
  value: string | number,
  isPM = false
): number {
  const hour = toNumber(value);
  if (
    isNaN(hour) ||
    hour < 0 ||
    hour > (isPM ? hoursPerDayHalf : hoursPerDay)
  ) {
    return NaN;
  }

  return hour;
}

export function parseMinutes(value: string | number): number {
  const minute = toNumber(value);
  if (isNaN(minute) || minute < 0 || minute > minutesPerHour) {
    return NaN;
  }

  return minute;
}

export function parseSeconds(value: string | number): number {
  const seconds = toNumber(value);
  if (isNaN(seconds) || seconds < 0 || seconds > secondsPerMinute) {
    return NaN;
  }

  return seconds;
}

export function parseTime(value: string | Date): Date {
  if (typeof value === 'string') {
    return new Date(value);
  }

  return value;
}

export function changeTime(value: Date, diff: Time): Date {
  if (!value) {
    return changeTime(createDate(new Date(), 0, 0, 0), diff);
  }

  let hour = value.getHours();
  let minutes = value.getMinutes();
  let seconds = value.getSeconds();

  if (diff.hour) {
    hour = (hour + toNumber(diff.hour)) % hoursPerDay;
    if (hour < 0) {
      hour += hoursPerDay;
    }
  }

  if (diff.minute) {
    minutes = minutes + toNumber(diff.minute);
  }

  if (diff.seconds) {
    seconds = seconds + toNumber(diff.seconds);
  }

  return createDate(value, hour, minutes, seconds);
}

export function setTime(value: Date, opts: Time): Date {
  let hour = parseHours(opts.hour);
  const minute = parseMinutes(opts.minute);
  const seconds = parseSeconds(opts.seconds) || 0;

  if (opts.isPM) {
    hour += hoursPerDayHalf;
  }

  // fixme: unreachable code, value is mandatory
  if (!value) {
    if (!isNaN(hour) && !isNaN(minute)) {
      return createDate(new Date(), hour, minute, seconds);
    }

    return value;
  }

  if (isNaN(hour) || isNaN(minute)) {
    return value;
  }

  return createDate(value, hour, minute, seconds);
}

export function createDate(
  value: Date,
  hours: number,
  minutes: number,
  seconds: number
): Date {
  // fixme: unreachable code, value is mandatory
  const _value = value || new Date();

  return new Date(
    _value.getFullYear(),
    _value.getMonth(),
    _value.getDate(),
    hours,
    minutes,
    seconds,
    _value.getMilliseconds()
  );
}

export function padNumber(value: number): string {
  const _value = value.toString();
  if (_value.length > 1) {
    return _value;
  }

  return `0${_value}`;
}

export function isInputValid(
  hours: string,
  minutes: string,
  seconds = '0',
  isPM: boolean
): boolean {
  return !(isNaN(parseHours(hours, isPM))
    || isNaN(parseMinutes(minutes))
    || isNaN(parseSeconds(seconds)));
}
