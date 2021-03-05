/**
 * Tells if a given input is a number
 */
export function isNumeric(n: string): boolean {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(Number(n));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumber(value?: any): value is number {
  return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]';
}
