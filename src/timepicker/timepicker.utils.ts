import { TimeUnit } from './timepicker.models';

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

export function parseTime(value: string | Date): Date {
  if (typeof value === 'string') {
    return new Date(value);
  }

  return value;
}

export function changeTime(value: Date, diff: TimeUnit): Date {
  if (!value) {
    const _value = new Date();

    return changeTime(new Date(_value.getFullYear(), _value.getMonth(), _value.getDate(),
      0, 0, 0, _value.getMilliseconds()), diff);
  }

  const _hoursPerDay = 24;
  // const _minutesPerHour = 60;
  // const _secondsPerMinute = 60;

  let hour = value.getHours();
  let minutes = value.getMinutes();
  let seconds = value.getSeconds();

  if (diff.hour) {
    hour = (hour + diff.hour) % _hoursPerDay;
    if (hour < 0) {
      hour += _hoursPerDay;
    }
  }

  if (diff.minute) {
    minutes = (minutes + diff.minute);
    // minutes = (minutes + diff.minute) % _minutesPerHour;
    // if (minutes < 0) {
    //   minutes += _minutesPerHour;
    // }
  }

  if (diff.seconds) {
    seconds = (seconds + diff.seconds);
    // seconds = (seconds + diff.seconds) % _secondsPerMinute;
    // if (seconds < 0) {
    //   seconds += _secondsPerMinute;
    // }
  }

  return new Date(value.getFullYear(), value.getMonth(), value.getDate(),
    hour, minutes, seconds, value.getMilliseconds());
}

export function setTime(value: Date, opts: TimeUnit): Date {
  if (!value) {
    return value;
  }

  const hour = (opts.hour || opts.hour === 0) ? opts.hour : value.getHours();
  const minute = (opts.minute || opts.minute === 0) ? opts.minute : value.getMinutes();
  const seconds = (opts.seconds || opts.seconds === 0) ? opts.seconds : value.getSeconds();

  return new Date(value.getFullYear(), value.getMonth(), value.getDate(),
    hour, minute, seconds, value.getMilliseconds());
}

export function padNumber(value: number): string {
  const _value = value.toString();
  if (_value.length > 1) { return _value; }

  return `0${_value}`;
}
