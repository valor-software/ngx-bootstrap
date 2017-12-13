import { hasOwnProp, isString } from '../utils/type-checks';

const aliases: { [key: string]: string } = {};

export function addUnitAlias(unit: string, shorthand: string): void {
  const lowerCase = unit.toLowerCase();
  aliases[lowerCase] = aliases[`${lowerCase}s`] = aliases[shorthand] = unit;
}

export function normalizeUnits(units: string | string[]) {
  return isString(units) ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

/*
export function normalizeObjectUnits(inputObject) {
  const normalizedInput = {};
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

  return normalizedInput;
}

*/
