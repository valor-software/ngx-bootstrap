/**
 * Get the opposite placement variation of the given one
 */
export function getOppositeVariation(variation: string) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }

  return variation;
}
