/**
 * Get offsets to the target
 */
import { getOppositePlacement } from './getOppositePlacement';
import { getOuterSizes } from './getOuterSizes';
import { Offsets } from '../models';


export function getTargetOffsets(
  target: HTMLElement,
  hostOffsets: Offsets,
  position: string
): Offsets {
  const placement = position.split(' ')[0];
  // Get target node sizes
  const targetRect = getOuterSizes(target);

  // Add position, width and height to our offsets object
  const targetOffsets = {
    width: targetRect.width,
    height: targetRect.height
  };

  // depending by the target placement we have to compute its offsets slightly differently
  const isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  const mainSide = isHoriz ? 'top' : 'left';
  const secondarySide = isHoriz ? 'left' : 'top';
  const measurement = isHoriz ? 'height' : 'width';
  const secondaryMeasurement = !isHoriz ? 'height' : 'width';

  targetOffsets[mainSide as keyof typeof targetOffsets] =
    (hostOffsets[mainSide] ?? 0) +
    hostOffsets[measurement] / 2 -
    targetRect[measurement] / 2;

  targetOffsets[secondarySide as keyof typeof targetOffsets] = placement === secondarySide
    ? (hostOffsets[secondarySide] ?? 0)- targetRect[secondaryMeasurement]
    : hostOffsets[getOppositePlacement(secondarySide) as keyof typeof hostOffsets] ?? 0;

  return targetOffsets;
}
