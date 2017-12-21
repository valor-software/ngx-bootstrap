import { createLocalOrUTC } from './from-anything';
import { DateArray, DateObject } from '../types';
import { DateInput } from '../test/chain';

export function parseDate(input: DateInput, format?: string | string[], localeKey?: string, strict?: boolean, isUTC?: boolean): Date {
    const config = createLocalOrUTC(input, format, localeKey, strict, isUTC);

    return config._d;
}
