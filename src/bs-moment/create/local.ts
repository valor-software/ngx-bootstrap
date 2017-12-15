import { createLocalOrUTC } from './from-anything';

export function createLocal(input: string, format?: string, localeKey?: string, strict?: boolean): Date {
    const config = createLocalOrUTC(input, format, localeKey, strict, false);

    return config._d;
}
