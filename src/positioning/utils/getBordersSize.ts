/**
 * Helper to detect borders of a given element
 */

export function getBordersSize(styles: CSSStyleDeclaration, axis: string) {
  const sideA = axis === 'x' ? 'Left' : 'Top';
  const sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return (
    parseFloat(styles[`border${sideA}Width`]) +
    parseFloat(styles[`border${sideB}Width`])
  );
}
