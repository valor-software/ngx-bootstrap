import {
  computeAutoPlacement,
  getReferenceOffsets,
  getTargetOffsets
} from '../utils';

import { Data } from '../models';

export function initData(targetElement: HTMLElement, hostElement: HTMLElement, position: string): Data {

  const hostElPosition = getReferenceOffsets(targetElement, hostElement);
  const targetOffset = getTargetOffsets(targetElement, hostElPosition, position);

  const placement = computeAutoPlacement(position, hostElPosition, targetElement, hostElement, 'viewport', 0);
  const placementAuto = position.indexOf('auto') !== -1;

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
