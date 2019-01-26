export function roundOffset(offsets: ClientRect): ClientRect {
  return {
    width: offsets.width,
    height: offsets.height,
    left: Math.floor(offsets.left),
    top: Math.round(offsets.top),
    bottom: Math.round(offsets.bottom),
    right: Math.floor(offsets.right)
  };
}
