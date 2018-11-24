/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 */
export function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}
