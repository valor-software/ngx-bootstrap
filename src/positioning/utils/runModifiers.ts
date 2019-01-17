import { isFunction } from './isFunction';
import { findIndex } from './findIndex';
import { getClientRect } from './getClientRect';

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 */
export function runModifiers(modifiers, data, ends?) {
  const modifiersToRun = ends === undefined
    ? modifiers
    : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(modifier => {
    if (modifier['function']) { // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    const fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);

      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}
