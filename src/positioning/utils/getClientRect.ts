/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 */
export function getClientRect(offsets) {
  return {
    ...offsets,
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height,
  };
}
