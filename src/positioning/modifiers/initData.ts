import {
  computeAutoPlacement,
  getReferenceOffsets,
  getTargetOffsets
} from '../utils';

import { Data, Options } from '../models';

export function initData(
  targetElement: HTMLElement, hostElement: HTMLElement, position: string, options: Options
): Data {

  const hostElPosition = getReferenceOffsets(targetElement, hostElement);

  if (!position.match(/^(auto)*\s*(left|right|top|bottom)*$/)
    && !position.match(/^(left|right|top|bottom)*\s*(start|end)*$/)) {
      /* tslint:disable-next-line: no-parameter-reassignment */
      position = 'auto';
    }

  const placementAuto = !!position.match(/auto/g);

  // support old placements 'auto left|right|top|bottom'
  let placement = position.match(/auto\s(left|right|top|bottom)/)
    ? position.split(' ')[1] || 'auto'
    : position;

  const targetOffset = getTargetOffsets(targetElement, hostElPosition, placement);

  placement = computeAutoPlacement(
    placement,
    hostElPosition,
    targetElement,
    hostElement,
    options ? options.allowedPositions : undefined
  );

  return {
    options,
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
