import { Duration } from './constructor';
import { DateObject } from '../types';
import { DateParsingConfig } from '../create/parsing.types';
export declare type DurationInput = string | number | Duration | Partial<DateObject> | {
    from: Date;
    to: Date;
};
export declare function createDuration(input?: DurationInput, key?: string, config?: DateParsingConfig): Duration;
