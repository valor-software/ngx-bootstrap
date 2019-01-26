import {
  getPopperOffsets,
  getBoundaries,
  getOppositePlacement,
  getOppositeVariation
} from '../utils';

export function flip(
  tooltip: HTMLElement,
  reference: HTMLElement,
  offsetsPopper: { [key: string]: number },
  referenceOffsets: { [key: string]: number },
  position: string
) {
  const boundaries = getBoundaries(
    tooltip,
    reference,
    5, // padding
    'viewport',
    false // positionFixed
  );

  let placement = position.split('-')[0];
  let placementOpposite = getOppositePlacement(placement);
  let variation = position.split('-')[1] || '';

  let flipOrder: string[] = [];

  flipOrder = [placement, placementOpposite];

  let popperOffsets = offsetsPopper;

  /* tslint:disable-next-line: cyclomatic-complexity */
  flipOrder.forEach((step, index) => {
    if (placement !== step || flipOrder.length === index + 1) {
      return placement;
    }

    placement = position.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    // using floor because the reference offsets may contain decimals we are not going to consider here
    const overlapsRef =
      (placement === 'left' &&
        Math.floor(popperOffsets.right) > Math.floor(referenceOffsets.left)) ||
      (placement === 'right' &&
        Math.floor(popperOffsets.left) < Math.floor(referenceOffsets.right)) ||
      (placement === 'top' &&
        Math.floor(popperOffsets.bottom) > Math.floor(referenceOffsets.top)) ||
      (placement === 'bottom' &&
        Math.floor(popperOffsets.top) < Math.floor(referenceOffsets.bottom));

    const overflowsLeft = Math.floor(popperOffsets.left) < Math.floor(boundaries.left);
    const overflowsRight = Math.floor(popperOffsets.right) > Math.floor(boundaries.right);
    const overflowsTop = Math.floor(popperOffsets.top) < Math.floor(boundaries.top);
    const overflowsBottom = Math.floor(popperOffsets.bottom) > Math.floor(boundaries.bottom);

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
          referenceOffsets,
          placement
        )
      };
    }

    tooltip.className = tooltip.className.replace(/left|right|top|bottom/g, `${placement}`);
  });

  return popperOffsets;
}
