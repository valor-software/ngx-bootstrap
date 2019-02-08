import { Data } from '../models';

export function shift(data: Data): Data {
  const placement = data.placement;
  const basePlacement = placement.split(' ')[0];
  const shiftvariation = placement.split(' ')[1];

  if (shiftvariation) {
    const { host, target } = data.offsets;
    const isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    const side = isVertical ? 'left' : 'top';
    const measurement = isVertical ? 'width' : 'height';

    const shiftOffsets = {
      left: { [side]: host[side] },
      right: {
        [side]: host[side] + host[measurement] - host[measurement]
      }
    };

    data.offsets.target = { ...target, ...shiftOffsets[shiftvariation] };
  }

  return data;
}
