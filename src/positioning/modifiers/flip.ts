import { Data, PositioningMap } from '../models';
import {
  computeAutoPlacement,
  getBoundaries,
  getClientRect,
  getOppositeVariation,
  getTargetOffsets,
  isModifierEnabled
} from '../utils';

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

  flipOrder.forEach((step, index) => {
    if (placement !== step || flipOrder.length === index + 1) {
      return;
    }

    placement = data.placement.split(' ')[0];

    // using floor because the host offsets may contain decimals we are not going to consider here
    const overlapsRef =
      (PositioningMap[placement as keyof typeof PositioningMap] === 'left' &&
        Math.floor(data.offsets.target.right ?? 0) > Math.floor(data.offsets.host.left ?? 0)) ||
      (PositioningMap[placement as keyof typeof PositioningMap] === 'right' &&
        Math.floor(data.offsets.target.left ?? 0) < Math.floor(data.offsets.host.right ?? 0)) ||
      (PositioningMap[placement as keyof typeof PositioningMap] === 'top' &&
        Math.floor(data.offsets.target.bottom ?? 0) > Math.floor(data.offsets.host.top ?? 0)) ||
      (PositioningMap[placement as keyof typeof PositioningMap] === 'bottom' &&
        Math.floor(data.offsets.target.top ?? 0) < Math.floor(data.offsets.host.bottom ?? 0));

    const overflowsLeft = Math.floor(data.offsets.target.left ?? 0) < Math.floor(boundaries.left ?? 0);
    const overflowsRight = Math.floor(data.offsets.target.right ?? 0) > Math.floor(boundaries.right ?? 0);
    const overflowsTop = Math.floor(data.offsets.target.top ?? 0) < Math.floor(boundaries.top ?? 0);
    const overflowsBottom = Math.floor(data.offsets.target.bottom ?? 0) > Math.floor(boundaries.bottom ?? 0);

    const overflowsBoundaries =
      (PositioningMap[placement as keyof typeof PositioningMap] === 'left' && overflowsLeft) ||
      (PositioningMap[placement as keyof typeof PositioningMap] === 'right' && overflowsRight) ||
      (PositioningMap[placement as keyof typeof PositioningMap] === 'top' && overflowsTop) ||
      (PositioningMap[placement as keyof typeof PositioningMap] === 'bottom' && overflowsBottom);

    // flip the variation if required
    const isVertical = ['top', 'bottom'].indexOf(PositioningMap[placement as keyof typeof PositioningMap]) !== -1;
    const flippedVariation =
      ((isVertical && PositioningMap[variation as keyof typeof PositioningMap]=== 'left' && overflowsLeft) ||
        (isVertical && PositioningMap[variation as keyof typeof PositioningMap] === 'right' && overflowsRight) ||
        (!isVertical && PositioningMap[variation as keyof typeof PositioningMap] === 'left' && overflowsTop) ||
        (!isVertical && PositioningMap[variation as keyof typeof PositioningMap] === 'right' && overflowsBottom));

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(PositioningMap[variation as keyof typeof PositioningMap]);
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
