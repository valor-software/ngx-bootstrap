/**
 * Helper to detect borders of a given element
 */

export function getBordersSize(styles: CSSStyleDeclaration, axis: string): number {
  const sideA = axis === 'x' ? 'Left' : 'Top';
  const sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return (
    parseFloat((styles as never)[`border${sideA}Width`]) +
    parseFloat((styles as never)[`border${sideB}Width`])
  );
}
