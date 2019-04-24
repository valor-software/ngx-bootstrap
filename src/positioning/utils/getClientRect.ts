/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 */
import { Offsets } from '../models';

export function getClientRect(offsets: Offsets): Offsets {
  return {
    ...offsets,
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  };
}
