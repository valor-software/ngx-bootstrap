/**
 * Get the opposite placement variation of the given one
 */
export function getOppositeVariation(variation: string) {
  if (variation === 'right') {
    return 'left';
  } else if (variation === 'left') {
    return 'right';
  }

  return variation;
}
