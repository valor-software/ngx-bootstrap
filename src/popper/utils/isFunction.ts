/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 */
export function isFunction(functionToCheck) {
  const getType = {};

  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === '[object Function]'
  );
}
