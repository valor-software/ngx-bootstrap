import { DateObject, UnitOfTime } from '../types';
export declare type ExtendedUnitOfTime = UnitOfTime | 'date' | 'week' | 'isoWeek' | 'dayOfYear' | 'weekday' | 'isoWeekday' | 'second' | 'millisecond' | 'minute' | 'hour' | 'quarter' | 'weekYear' | 'isoWeekYear';
export declare function addUnitAlias(unit: ExtendedUnitOfTime, shorthand: string): void;
export declare function normalizeUnits(units: string | string[]): string;
export declare function normalizeObjectUnits(inputObject: {
    [key: string]: number;
}): DateObject;
