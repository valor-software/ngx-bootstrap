import { absFloor } from '../utils';

export function isString(str: any): str is String  {
  return typeof str === 'string';
}

export function isDateValid(date: Date): boolean {
  return date && date.getTime && !isNaN(date.getTime());
}
export function isFunction(fn: any): fn is Function {
  return (
    fn instanceof Function ||
    Object.prototype.toString.call(fn) === '[object Function]'
  );
}

export function isNumber(value: any): value is number {
  return !isNaN(toInt(value));
}

export function isArray<T>(input: any): input is T[] {
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


export function isObjectEmpty(obj: any): boolean {
  if (Object.getOwnPropertyNames) {
    return (Object.getOwnPropertyNames(obj).length === 0);
  }
  let k;
  for (k in obj) {
    if (obj.hasOwnProperty(k)) {
      return false;
    }
  }

  return true;
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
