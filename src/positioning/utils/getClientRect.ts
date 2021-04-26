/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 */
import { Offsets } from '../models';

export function getClientRect(offsets: Offsets): Offsets {
  return {
    ...offsets,
    right: (offsets.left || 0) + offsets.width,
    bottom: (offsets.top || 0) + offsets.height
  };
}
