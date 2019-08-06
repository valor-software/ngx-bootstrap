/**
 * Tells if a given input is a number
 */
export function isNumeric(n: any) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}
