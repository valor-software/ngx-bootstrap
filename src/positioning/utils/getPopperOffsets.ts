import { getOuterSizes } from './getOuterSizes';
import { getOppositePlacement } from './getOppositePlacement';

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 */
export function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

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

  if (placement === secondarySide) {
    popperOffsets[secondarySide] =
      referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] =
      referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}
