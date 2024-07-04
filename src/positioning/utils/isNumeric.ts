/**
 * Tells if a given input is a number
 */
export function isNumeric(n: string): boolean {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(Number(n));
}

export function isNumber(value?: unknown): value is number {
  return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]';
}
