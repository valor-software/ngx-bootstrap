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
  allowedPositions: any[] = ['top', 'bottom', 'right', 'left'],
  boundariesElement = 'viewport',
  padding = 0
) {
  if (placement.indexOf('auto') === -1) {
    return placement;
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

  let filteredAreas: any[] = sortedAreas.filter(
    ({ width, height }) => {
      return width >= target.clientWidth
        && height >= target.clientHeight;
    }
  );

  filteredAreas = filteredAreas.filter((position: any) => {
    return allowedPositions
      .some((allowedPosition: string) => {
        return allowedPosition === position.key;
      });
  });

  const computedPlacement: string = filteredAreas.length > 0
    ? filteredAreas[0].key
    : sortedAreas[0].key;

  const variation = placement.split(' ')[1];

  // for tooltip on auto position
  target.className = target.className.replace(/bs-tooltip-auto/g, `bs-tooltip-${computedPlacement}`);

  return computedPlacement + (variation ? `-${variation}` : '');
}
