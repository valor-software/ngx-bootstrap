import { DateParsingConfig } from '../create/parsing.types';
export declare function cloneWithOffset(input: Date, date: Date, config?: DateParsingConfig): Date;
export declare function getDateOffset(date: Date): number;
export declare function getUTCOffset(date: Date, config?: DateParsingConfig): number;
export declare function setUTCOffset(date: Date, input: number | string, keepLocalTime?: boolean, keepMinutes?: boolean, config?: DateParsingConfig): Date;
export declare function setOffsetToUTC(date: Date, keepLocalTime?: boolean): Date;
export declare function isDaylightSavingTime(date: Date): boolean;
export declare function setOffsetToParsedOffset(date: Date, input: string, config?: DateParsingConfig): Date;
export declare function hasAlignedHourOffset(date: Date, input?: Date): boolean;
