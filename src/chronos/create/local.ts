import { createLocalOrUTC } from './from-anything';
import { DateInput } from '../test/chain';
import { isDate } from '../utils/type-checks';

export function parseDate(input: DateInput, format?: string | string[],
                          localeKey?: string, strict?: boolean, isUTC?: boolean): Date {
  if (isDate(input)) {
    return input;
  }

  const config = createLocalOrUTC(input, format, localeKey, strict, isUTC);

  return config._d;
}

export function utcAsLocal(date) {
  if (!(date instanceof Date)) {
    return null;
  }

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds()
  );
}
