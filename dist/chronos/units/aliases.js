import { hasOwnProp, isString } from '../utils/type-checks';
var aliases = {};
var _mapUnits = {
    date: 'day',
    hour: 'hours',
    minute: 'minutes',
    second: 'seconds',
    millisecond: 'milliseconds'
};
export function addUnitAlias(unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    var _unit = unit;
    if (lowerCase in _mapUnits) {
        _unit = _mapUnits[lowerCase];
    }
    aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = _unit;
}
export function normalizeUnits(units) {
    return isString(units) ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}
export function normalizeObjectUnits(inputObject) {
    var normalizedInput = {};
    var normalizedProp;
    var prop;
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
//# sourceMappingURL=aliases.js.map