import {
  computeAutoPlacement,
  getBoundaries,
  getOppositeVariation,
  getTargetOffsets
} from '../utils';

import { Offsets } from '../models';

export function flip(
  target: HTMLElement,
  host: HTMLElement,
  offsetsTarget: Offsets,
  hostOffsets: Offsets,
  position: string
): Offsets {
  const boundaries = getBoundaries(
    target,
    host,
    0, // padding
    'viewport',
    false // positionFixed
  );

  let placement = position.split(' ')[0];
  let variation = position.split(' ')[1] || '';

  const autoPosition = computeAutoPlacement('auto', hostOffsets, target, host, 'viewport', 0);
  const flipOrder = [placement, autoPosition];

  let targetOffsets = offsetsTarget;

  /* tslint:disable-next-line: cyclomatic-complexity */
  flipOrder.forEach((step, index) => {
    if (placement !== step || flipOrder.length === index + 1) {
      targetOffsets.placement = placement;

      return targetOffsets;
    }

    placement = position.split(' ')[0];


    // using floor because the host offsets may contain decimals we are not going to consider here
    const overlapsRef =
      (placement === 'left' &&
        Math.floor(targetOffsets.right) > Math.floor(hostOffsets.left)) ||
      (placement === 'right' &&
        Math.floor(targetOffsets.left) < Math.floor(hostOffsets.right)) ||
      (placement === 'top' &&
        Math.floor(targetOffsets.bottom) > Math.floor(hostOffsets.top)) ||
      (placement === 'bottom' &&
        Math.floor(targetOffsets.top) < Math.floor(hostOffsets.bottom));

    const overflowsLeft = Math.floor(targetOffsets.left) < Math.floor(boundaries.left);
    const overflowsRight = Math.floor(targetOffsets.right) > Math.floor(boundaries.right);
    const overflowsTop = Math.floor(targetOffsets.top) < Math.floor(boundaries.top);
    const overflowsBottom = Math.floor(targetOffsets.bottom) > Math.floor(boundaries.bottom);

    const overflowsBoundaries =
      (placement === 'left' && overflowsLeft) ||
      (placement === 'right' && overflowsRight) ||
      (placement === 'top' && overflowsTop) ||
      (placement === 'bottom' && overflowsBottom);

    // flip the variation if required
    const isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    const flippedVariation =
      ((isVertical && variation === 'left' && overflowsLeft) ||
        (isVertical && variation === 'right' && overflowsRight) ||
        (!isVertical && variation === 'left' && overflowsTop) ||
        (!isVertical && variation === 'right' && overflowsBottom));

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      // data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      placement = placement + (variation ? ` ${variation}` : '');

      targetOffsets = {
        ...targetOffsets,
        ...getTargetOffsets(
          target,
          hostOffsets,
          placement
        )
      };
    }

    target.className = target.className.replace(/left|right|top|bottom/g, `${placement}`);
  });

  targetOffsets.placement = placement;

  return targetOffsets;
}
