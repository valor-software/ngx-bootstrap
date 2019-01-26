/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 */
export function getClientRect(offsets: { [key: string]: number }) {
  return {
    ...offsets,
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  };
}
