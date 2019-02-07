/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 */
import { getBoundaries } from './getBoundaries';
import { Offsets } from '../models';

function getArea({ width, height }: { [key: string]: number }) {
  return width * height;
}

export function computeAutoPlacement(
  placement: string,
  refRect: Offsets,
  target: HTMLElement,
  host: HTMLElement,
  boundariesElement: string,
  padding = 0
) {
  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  if (placement.indexOf('auto') !== -1
    && (placement.indexOf('left') !== -1
    || placement.indexOf('right') !== -1
    || placement.indexOf('top') !== -1
    || placement.indexOf('bottom') !== -1)) {

    return placement.split(' ')[1] || '';
  }

  const boundaries = getBoundaries(target, host, padding, boundariesElement);

  const rects: any = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  const sortedAreas = Object.keys(rects)
    .map(key => ({
      key,
      ...rects[key],
      area: getArea(rects[key])
    }))
    .sort((a, b) => b.area - a.area);

  const filteredAreas = sortedAreas.filter(
    ({ width, height }) =>
      width >= target.clientWidth && height >= target.clientHeight
  );

  const computedPlacement: string = filteredAreas.length > 0
    ? filteredAreas[0].key
    : sortedAreas[0].key;

  const variation = placement.split(' ')[1];

  target.className = target.className.replace(/auto/g, computedPlacement);

  return computedPlacement + (variation ? `-${variation}` : '');
}
