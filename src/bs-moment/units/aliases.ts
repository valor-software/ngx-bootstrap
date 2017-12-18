import { hasOwnProp, isString } from '../utils/type-checks';
import { DateObject } from '../types';

const aliases: { [key: string]: string } = {};

export function addUnitAlias(unit: string, shorthand: string): void {
  const lowerCase = unit.toLowerCase();
  aliases[lowerCase] = aliases[`${lowerCase}s`] = aliases[shorthand] = unit;
}

export function normalizeUnits(units: string | string[]) {
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
