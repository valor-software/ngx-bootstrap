import { setOffsetToUTC } from '../units/offset';
import { createLocalOrUTC } from './from-anything';
import { DateArray } from '../types';

export function createUTC(input: string | number | DateArray, format?: string, localeKey?: string, strict?: boolean): Date {
  const conf = createLocalOrUTC(input, format, localeKey, strict, true);

  return setOffsetToUTC(conf._d);
}
