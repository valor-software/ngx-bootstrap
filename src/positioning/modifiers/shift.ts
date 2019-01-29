import { Offsets } from '../models';

export function shift(
  offsetsTarget: Offsets,
  referenceOffset: Offsets,
  placement: string
) {
  let targetOffsets = offsetsTarget;
  const basePlacement = placement.split(' ')[0];
  const shiftvariation = placement.split(' ')[1];

  if (shiftvariation) {
    const isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    const side = isVertical ? 'left' : 'top';
    const measurement = isVertical ? 'width' : 'height';

    const shiftOffsets = {
      left: { [side]: referenceOffset[side] },
      right: {
        [side]: referenceOffset[side] + referenceOffset[measurement] - targetOffsets[measurement]
      }
    };

    targetOffsets = { ...targetOffsets, ...shiftOffsets[shiftvariation] };
  }

  return targetOffsets;
}
