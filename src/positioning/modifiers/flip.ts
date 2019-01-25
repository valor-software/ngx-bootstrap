import {
  getPopperOffsets,
  getBoundaries,
  getOffsetParent,
  getOppositePlacement,
  getOppositeVariation
} from '../utils';

export function flip(boundariesEl, tooltip, reference, offsetsPopper, referenceOffsets, inputPlacement) {
  let boundariesElement =
    boundariesEl || getOffsetParent(tooltip);

  const boundaries = getBoundaries(
    tooltip,
    reference,
    5, // options.padding
    boundariesElement,
    false // data.positionFixed
  );

  let placement = inputPlacement.split('-')[0];
  let placementOpposite = getOppositePlacement(placement);
  let variation = inputPlacement.split('-')[1] || '';

  let flipOrder = [];

  flipOrder = [placement, placementOpposite];

  let popperOffsets = offsetsPopper;
  // popperOffsets.right = 0;

  let refOffsets = referenceOffsets;

  /* tslint:disable-next-line: cyclomatic-complexity */
  flipOrder.forEach((step, index) => {
    if (placement !== step || flipOrder.length === index + 1) {
      return placement;
    }

    placement = inputPlacement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    // using floor because the reference offsets may contain decimals we are not going to consider here
    const floor = Math.floor;
    const overlapsRef =
      (placement === 'left' &&
        floor(popperOffsets.right) > floor(refOffsets.left)) ||
      (placement === 'right' &&
        floor(popperOffsets.left) < floor(refOffsets.right)) ||
      (placement === 'top' &&
        floor(popperOffsets.bottom) > floor(refOffsets.top)) ||
      (placement === 'bottom' &&
        floor(popperOffsets.top) < floor(refOffsets.bottom));

    const overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    const overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    const overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    const overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    const overflowsBoundaries =
      (placement === 'left' && overflowsLeft) ||
      (placement === 'right' && overflowsRight) ||
      (placement === 'top' && overflowsTop) ||
      (placement === 'bottom' && overflowsBottom);

    // flip the variation if required
    const isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    const flippedVariation =
      ((isVertical && variation === 'start' && overflowsLeft) ||
        (isVertical && variation === 'end' && overflowsRight) ||
        (!isVertical && variation === 'start' && overflowsTop) ||
        (!isVertical && variation === 'end' && overflowsBottom));

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      // data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      placement = placement + (variation ? `-${variation}` : '');

      popperOffsets = {
        ...popperOffsets,
        ...getPopperOffsets(
          tooltip,
          refOffsets,
          placement
        )
      };
    }

    tooltip.className = tooltip.className.replace(/left|right|top|bottom/g, `${placement}`);
  });

  return popperOffsets;
}
