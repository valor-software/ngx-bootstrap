/**
 * Tells if a given input is a number
 */
export function isNumeric(n: string): boolean {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
}
