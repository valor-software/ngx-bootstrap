import {
  computeAutoPlacement,
  getReferenceOffsets,
  getTargetOffsets
} from '../utils';

import { Data } from '../models';

export function initData(targetElement: HTMLElement, hostElement: HTMLElement, position: string): Data {

  const hostElPosition = getReferenceOffsets(targetElement, hostElement);
  const placementAuto = !!position.match(/auto/g);

  // support old placements 'auto left|right|top|bottom'
  let placement = !!position.match(/auto\s(left|right|top|bottom)/g)
    ? position.split(' ')[1] || ''
    : position;

  const targetOffset = getTargetOffsets(targetElement, hostElPosition, placement);
  placement = computeAutoPlacement(placement, hostElPosition, targetElement, hostElement, 'viewport', 0);

  return {
    instance: {
      target: targetElement,
      host: hostElement,
      arrow: null
    },
    offsets: {
      target: targetOffset,
      host: hostElPosition,
      arrow: null
    },
    positionFixed: false,
    placement,
    placementAuto
  };
}
