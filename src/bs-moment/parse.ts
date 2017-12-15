import { createLocalOrUtc } from './create/from-anything';

/**
 * @public parse date
 */
export function createLocal(input: string, format?: string, localeKey?: string, strict?: boolean): Date {
  const conf = createLocalOrUtc(input, format, localeKey, strict, false);

  return conf._d;
}
