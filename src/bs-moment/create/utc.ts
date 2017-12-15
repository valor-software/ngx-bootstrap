import { setOffsetToUTC } from '../units/offset';
import { createLocalOrUTC } from './from-anything';

export function createUTC(input: string | number, format?: string, localeKey?: string, strict?: boolean): Date {
  const conf = createLocalOrUTC(input, format, localeKey, strict, true);

  return setOffsetToUTC(conf._d);
}
