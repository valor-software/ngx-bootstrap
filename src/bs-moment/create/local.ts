import { createLocalOrUTC } from './from-anything';

export function createLocal(input: string, format?: string, localeKey?: string, strict?: boolean): Date {
    return createLocalOrUTC(input, format, localeKey, strict, false);
}
