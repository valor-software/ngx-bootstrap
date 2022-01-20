import { Data } from '../models';

export function shift(data: Data): Data {
  const placement = data.placement;
  const basePlacement = placement.split(' ')[0];
  const shiftVariation = placement.split(' ')[1];

  if (shiftVariation) {
    const { host, target } = data.offsets;
    const isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    const side = isVertical ? 'left' : 'top';
    const measurement = isVertical ? 'width' : 'height';

    const shiftOffsets = {
      start: { [side]: host[side] },
      end: {
        [side]: (host[side] ?? 0) + host[measurement] - target[measurement]
      }
    };

    data.offsets.target = {
      ...target, ...{
        [side]: (side === shiftVariation ? shiftOffsets.start[side] : shiftOffsets.end[side])
      }
    };
  }

  return data;
}
