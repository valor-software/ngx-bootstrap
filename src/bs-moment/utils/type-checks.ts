import { absFloor } from '../utils';

export function isDateValid(date: Date): boolean {
  return date && !isNaN(date.getTime());
}
export function isFunction(fn: Function): fn is Function {
  return (
    fn instanceof Function ||
    Object.prototype.toString.call(fn) === '[object Function]'
  );
}

export function isArray(input: any): boolean {
  return (
    input instanceof Array ||
    Object.prototype.toString.call(input) === '[object Array]'
  );
}

export function hasOwnProp(a: any /*object*/, b: string | number): boolean {
  return Object.prototype.hasOwnProperty.call(a, b);
}

export function isObject(input: any /*object*/): boolean {
  // IE8 will treat undefined and null as object if it wasn't for
  // input != null
  return (
    input != null && Object.prototype.toString.call(input) === '[object Object]'
  );
}

export function isUndefined(input: any): boolean {
  return input === void 0;
}

export function toInt(argumentForCoercion: string | number): number {
  const coercedNumber = +argumentForCoercion;
  let value = 0;

  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor(coercedNumber);
  }

  return value;
}
