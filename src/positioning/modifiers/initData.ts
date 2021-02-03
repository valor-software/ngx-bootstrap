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
    && !position.match(/^(left|right|top|bottom)*(?: (left|right|top|bottom))?\s*(start|end)*$/)) {
      /* tslint:disable-next-line: no-parameter-reassignment */
      position = 'auto';
    }

  const placementAuto = !!position.match(/auto/g);

  // support old placements 'auto left|right|top|bottom'
  let placement = position.match(/auto\s(left|right|top|bottom)/)
    ? position.split(' ')[1] || 'auto'
    : position;

  // Normalize placements that have identical main placement and variation ("right right" => "right").
  const matches = placement.match(/^(left|right|top|bottom)* ?(?!\1)(left|right|top|bottom)?/);
  if (matches) {
    placement = matches[1] + (matches[2] ? ` ${matches[2]}` : '');
  }

  // "left right", "top bottom" etc. placements also considered incorrect.
  if (['left right', 'right left', 'top bottom', 'bottom top'].indexOf(placement) !== -1) {
    placement = 'auto';
  }

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
