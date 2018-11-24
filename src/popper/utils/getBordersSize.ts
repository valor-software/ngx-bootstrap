/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * Result of `getStyleComputedProperty` on the given element
 */

export function getBordersSize(styles, axis) {
  const sideA = axis === 'x' ? 'Left' : 'Top';
  const sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return (
    parseFloat(styles[`border${sideA}Width`]) +
    parseFloat(styles[`border${sideB}Width`])
  );
}
