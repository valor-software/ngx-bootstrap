import { DateParsingConfig } from './parsing.types';
import { DateInput } from '../test/chain';
export declare function prepareConfig(config: DateParsingConfig): DateParsingConfig;
export declare function createLocalOrUTC(input: DateInput, format?: string | string[], localeKey?: string, strict?: boolean, isUTC?: boolean): DateParsingConfig;
