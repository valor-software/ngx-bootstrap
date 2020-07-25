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
        [side]: host[side] + host[measurement] - target[measurement]
      }
    };

    data.offsets.target = {
      ...target, ...{
        [side]: (side === shiftVariation ? (shiftOffsets as any).start[side] : (shiftOffsets as any).end[side])
      }
    };
  }

  return data;
}
