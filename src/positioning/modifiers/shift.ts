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
      start: { [side]: host[side] },
      end: {
        [side]: host[side] + host[measurement] - target[measurement]
      }
    };

    data.offsets.target = { ...target, ...(shiftOffsets as any)[shiftvariation] };
  }

  return data;
}
