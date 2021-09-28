import { Time, TimepickerComponentState } from './timepicker.models';

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

export function isValidLimit(controls: TimepickerComponentState, newDate: Date): boolean {
  if (controls.min && newDate < controls.min) {
    return false;
  }

  if (controls.max && newDate > controls.max) {
    return false;
  }

  return true;
}

export function toNumber(value?: string | number): number {
  if (typeof value === 'undefined') {
    return NaN;
  }

  if (typeof value === 'number') {
    return value;
  }

  return parseInt(value, dex);
}

export function isNumber(value: string | number): value is number {
  return !isNaN(toNumber(value));
}

export function parseHours(
  value?: string | number,
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

export function parseMinutes(value?: string | number): number {
  const minute = toNumber(value);
  if (isNaN(minute) || minute < 0 || minute > minutesPerHour) {
    return NaN;
  }

  return minute;
}

export function parseSeconds(value?: string | number): number {
  const seconds = toNumber(value);
  if (isNaN(seconds) || seconds < 0 || seconds > secondsPerMinute) {
    return NaN;
  }

  return seconds;
}

export function parseTime(value?: string | Date): Date | undefined {
  if (typeof value === 'string') {
    return new Date(value);
  }

  return value;
}

export function changeTime(value?: Date, diff?: Time): Date {
  if (!value) {
    return changeTime(createDate(new Date(), 0, 0, 0), diff);
  }

  if (!diff) {
    return value;
  }

  let hour = value.getHours();
  let minutes = value.getMinutes();
  let seconds = value.getSeconds();

  if (diff.hour) {
    hour = hour + toNumber(diff.hour);
  }

  if (diff.minute) {
    minutes = minutes + toNumber(diff.minute);
  }

  if (diff.seconds) {
    seconds = seconds + toNumber(diff.seconds);
  }

  return createDate(value, hour, minutes, seconds);
}

export function setTime(value: Date | undefined, opts: Time): Date | undefined {
  let hour = parseHours(opts.hour);
  const minute = parseMinutes(opts.minute);
  const seconds = parseSeconds(opts.seconds) || 0;

  if (opts.isPM && hour !== 12) {
    hour += hoursPerDayHalf;
  }

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
  const newValue = new Date(
    value.getFullYear(),
    value.getMonth(),
    value.getDate(),
    hours,
    minutes,
    seconds,
    value.getMilliseconds()
  );
  // #3139 ensure date part remains unchanged
  newValue.setFullYear(value.getFullYear());
  newValue.setMonth(value.getMonth());
  newValue.setDate(value.getDate());

  return newValue;
}

export function padNumber(value: number): string {
  const _value = value.toString();
  if (_value.length > 1) {
    return _value;
  }

  return `0${_value}`;
}

export function isHourInputValid(hours: string, isPM: boolean): boolean {
  return !isNaN(parseHours(hours, isPM));
}

export function isMinuteInputValid(minutes: string): boolean {
  return !isNaN(parseMinutes(minutes));
}

export function isSecondInputValid(seconds: string): boolean {
  return !isNaN(parseSeconds(seconds));
}

export function isInputLimitValid(diff: Time, max?: Date, min?: Date): boolean {
  const newDate = setTime(new Date(), diff);

  if (!newDate) {
    return false;
  }

  if (max && newDate > max) {
    return false;
  }

  if (min && newDate < min) {
    return false;
  }

  return true;
}

export function isOneOfDatesEmpty(hours: string, minutes: string, seconds: string): boolean {
  return hours.length === 0 || minutes.length === 0 || seconds.length === 0;
}

export function isInputValid(
  hours: string,
  minutes = '0',
  seconds = '0',
  isPM: boolean
): boolean {
  return isHourInputValid(hours, isPM)
    && isMinuteInputValid(minutes)
    && isSecondInputValid(seconds);
}
