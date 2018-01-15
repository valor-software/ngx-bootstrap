import { setOffsetToUTC } from '../units/offset';
import { createLocalOrUTC } from './from-anything';
import { DateArray } from '../types';
import { DateInput } from '../test/chain';

export function createUTC(input?: DateInput, format?: string, localeKey?: string, strict?: boolean): Date {
  const conf = createLocalOrUTC(input, format, localeKey, strict, true);

  return setOffsetToUTC(conf._d);
}
