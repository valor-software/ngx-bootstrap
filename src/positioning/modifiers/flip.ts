import {
  computeAutoPlacement,
  getBoundaries,
  getClientRect,
  getOppositeVariation,
  getTargetOffsets,
  isModifierEnabled
} from '../utils';

import { Data } from '../models';

export function flip(data: Data): Data {
  data.offsets.target = getClientRect(data.offsets.target);

  if (!isModifierEnabled(data.options, 'flip')) {

    data.offsets.target = {
      ...data.offsets.target,
      ...getTargetOffsets(
        data.instance.target,
        data.offsets.host,
        data.placement
      )
    };

    return data;
  }

  const boundaries = getBoundaries(
    data.instance.target,
    data.instance.host,
    0, // padding
    'viewport',
    false // positionFixed
  );

  let placement = data.placement.split(' ')[0];
  let variation = data.placement.split(' ')[1] || '';

  const offsetsHost = data.offsets.host;
  const target = data.instance.target;
  const host = data.instance.host;

  const adaptivePosition = computeAutoPlacement('auto', offsetsHost, target, host, data.options.allowedPositions);
  const flipOrder = [placement, adaptivePosition];

  /* tslint:disable-next-line: cyclomatic-complexity */
  flipOrder.forEach((step, index) => {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split(' ')[0];

    // using floor because the host offsets may contain decimals we are not going to consider here
    const overlapsRef =
      (placement === 'left' &&
        Math.floor(data.offsets.target.right) > Math.floor(data.offsets.host.left)) ||
      (placement === 'right' &&
        Math.floor(data.offsets.target.left) < Math.floor(data.offsets.host.right)) ||
      (placement === 'top' &&
        Math.floor(data.offsets.target.bottom) > Math.floor(data.offsets.host.top)) ||
      (placement === 'bottom' &&
        Math.floor(data.offsets.target.top) < Math.floor(data.offsets.host.bottom));

    const overflowsLeft = Math.floor(data.offsets.target.left) < Math.floor(boundaries.left);
    const overflowsRight = Math.floor(data.offsets.target.right) > Math.floor(boundaries.right);
    const overflowsTop = Math.floor(data.offsets.target.top) < Math.floor(boundaries.top);
    const overflowsBottom = Math.floor(data.offsets.target.bottom) > Math.floor(boundaries.bottom);

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
      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? ` ${variation}` : '');

      data.offsets.target = {
        ...data.offsets.target,
        ...getTargetOffsets(
          data.instance.target,
          data.offsets.host,
          data.placement
        )
      };
    }
  });

  return data;
}
