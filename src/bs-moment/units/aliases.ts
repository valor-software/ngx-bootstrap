import { hasOwnProp, isString } from '../utils/type-checks';
import { DateObject, UnitOfTime } from '../types';

const aliases: { [key: string]: string } = {};

export type ExtendedUnitOfTime = UnitOfTime | 'date' | 'week' | 'isoWeek' | 'dayOfYear' |
  'weekday' | 'isoWeekday' | 'second' | 'millisecond' | 'minute' | 'hour' | 'quarter' | 'weekYear' | 'isoWeekYear';

const _mapUnits: { [key: string]: UnitOfTime } = {
  date: 'day',
  hour: 'hours',
  minute: 'minutes',
  second: 'seconds',
  millisecond: 'milliseconds'
};

export function addUnitAlias(unit: ExtendedUnitOfTime, shorthand: string): void {
  const lowerCase = unit.toLowerCase();
  let _unit = unit;
  if (lowerCase in _mapUnits) {
    _unit = _mapUnits[lowerCase];
  }
  aliases[lowerCase] = aliases[`${lowerCase}s`] = aliases[shorthand] = _unit;
}

export function normalizeUnits(units: string | string[]): string {
  return isString(units) ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

export function normalizeObjectUnits(inputObject: { [key: string]: number }): DateObject {
  const normalizedInput: { [key: string]: number } = {};
  let normalizedProp;
  let prop;

  for (prop in inputObject) {
    if (hasOwnProp(inputObject, prop)) {
      normalizedProp = normalizeUnits(prop);
      if (normalizedProp) {
        normalizedInput[normalizedProp] = inputObject[prop];
      }
    }
  }

  return normalizedInput as any;
}
