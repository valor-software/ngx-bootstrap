/**
 * Get offsets to the popper
 */
import { getOuterSizes } from './getOuterSizes';
import { getOppositePlacement } from './getOppositePlacement';

export function getPopperOffsets(
  popper: HTMLElement,
  referenceOffsets: { [key: string]: number },
  position: string
) {
  const placement = position.split('-')[0];

  // Get popper node sizes
  const popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  const popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  const isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  const mainSide = isHoriz ? 'top' : 'left';
  const secondarySide = isHoriz ? 'left' : 'top';
  const measurement = isHoriz ? 'height' : 'width';
  const secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] =
    referenceOffsets[mainSide] +
    referenceOffsets[measurement] / 2 -
    popperRect[measurement] / 2;

  popperOffsets[secondarySide] = placement === secondarySide
    ? referenceOffsets[secondarySide] - popperRect[secondaryMeasurement]
    : referenceOffsets[getOppositePlacement(secondarySide)];

  return popperOffsets;
}
