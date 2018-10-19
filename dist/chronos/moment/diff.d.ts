import { DateParsingConfig } from '../create/parsing.types';
import { UnitOfTime } from '../types';
export declare function diff(date: Date, input: Date, units: UnitOfTime, asFloat: boolean, config?: DateParsingConfig): number;
