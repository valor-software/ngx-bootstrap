/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 */
import { getBoundaries } from './getBoundaries';
import { Offsets, PlacementForBs5 } from '../models';
import { getBsVer } from 'ngx-bootstrap/utils';

function getArea({ width, height }: { width: number, height: number }) {
  return width * height;
}

export function computeAutoPlacement(
  placement: string,
  refRect: Offsets,
  target: HTMLElement,
  host: HTMLElement,
  allowedPositions = ['top', 'bottom', 'right', 'left'],
  boundariesElement = 'viewport',
  padding = 0
) {
  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  const boundaries = getBoundaries(target, host, padding, boundariesElement);

  type Rects = {top: Offsets, right: Offsets, bottom: Offsets, left: Offsets};
  const rects: Rects = {
    top: {
      width: boundaries.width ?? 0,
      height: refRect.top && boundaries.top ? refRect.top - boundaries.top : 0
    },
    right: {
      width: boundaries.right && refRect.right ? boundaries.right - refRect.right : 0,
      height: boundaries.height ?? 0
    },
    bottom: {
      width: boundaries.width ?? 0,
      height: boundaries.bottom && refRect.bottom ? boundaries.bottom - refRect.bottom: 0
    },
    left: {
      width: refRect.left && boundaries.left ? refRect.left - boundaries.left : 0,
      height: boundaries.height ?? 0
    }
  };

  const sortedAreas = Object.keys(rects)
    .map((key) => ({
      key,
      ...rects[key as keyof Rects],
      area: getArea(rects[key as keyof Rects] as {width: number, height: number})
    }))
    .sort((a, b) => b.area - a.area);

  let filteredAreas = sortedAreas.filter(
    ({ width, height }) => {
      return width >= target.clientWidth
        && height >= target.clientHeight;
    }
  );

  filteredAreas = filteredAreas.filter((position) => {
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
  target.className = target.className.replace(/bs-tooltip-auto/g, `bs-tooltip-${getBsVer().isBs5 ? PlacementForBs5[computedPlacement as keyof typeof PlacementForBs5] : computedPlacement}`);

  return computedPlacement + (variation ? `-${variation}` : '');
}
