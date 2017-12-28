import { absFloor } from '../utils';

export function isString(str: any): str is string {
  return typeof str === 'string';
}

export function isDate(value: any): value is Date {
  return value instanceof Date || Object.prototype.toString.call(value) === '[object Date]';
}

export function isBoolean(value: any): value is boolean {
  return value === true || value === false;
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

export function isNumber(value?: any): value is number {
  return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]';
}

export function isArray<T>(input?: any): input is T[] {
  return (
    input instanceof Array ||
    Object.prototype.toString.call(input) === '[object Array]'
  );
}

export function hasOwnProp<T>(a: T /*object*/, b: string): b is keyof T {
  return Object.prototype.hasOwnProperty.call(a, b);
}

export function isObject<T>(input: any /*object*/): input is T {
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

export function toInt<T>(argumentForCoercion: string | number | T): number {
  const coercedNumber = +argumentForCoercion;
  let value = 0;

  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor(coercedNumber);
  }

  return value;
}
