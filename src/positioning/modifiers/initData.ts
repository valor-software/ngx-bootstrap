import {
  computeAutoPlacement,
  getReferenceOffsets,
  getTargetOffsets
} from '../utils';

import { Data, Options } from '../models';

export function initData(
  targetElement: HTMLElement|null, hostElement: HTMLElement|null, position: string, options?: Options
): Data|undefined {

  if (!targetElement || !hostElement) {
    return ;
  }

  const hostElPosition = getReferenceOffsets(targetElement, hostElement);

  if (!position.match(/^(auto)*\s*(left|right|top|bottom|start|end)*$/)
    && !position.match(/^(left|right|top|bottom|start|end)*(?: (left|right|top|bottom|start|end))*$/)) {
            position = 'auto';
    }

  const placementAuto = !!position.match(/auto/g);

  // support old placements 'auto left|right|top|bottom'
  let placement = position.match(/auto\s(left|right|top|bottom|start|end)/)
    ? position.split(' ')[1] || 'auto'
    : position;

  // Normalize placements that have identical main placement and variation ("right right" => "right").
  const matches = placement.match(/^(left|right|top|bottom|start|end)* ?(?!\1)(left|right|top|bottom|start|end)?/);
  if (matches) {
    placement = matches[1] + (matches[2] ? ` ${matches[2]}` : '');
  }

  // "left right", "top bottom" etc. placements also considered incorrect.
  if (['left right', 'right left', 'top bottom', 'bottom top'].indexOf(placement) !== -1) {
    placement = 'auto';
  }

  placement = computeAutoPlacement(
    placement,
    hostElPosition,
    targetElement,
    hostElement,
    options ? options.allowedPositions : undefined
  );

  const targetOffset = getTargetOffsets(targetElement, hostElPosition, placement);

  return {
    options: options || {modifiers: {}},
    instance: {
      target: targetElement,
      host: hostElement,
      arrow: void 0
    },
    offsets: {
      target: targetOffset,
      host: hostElPosition,
      arrow: void 0
    },
    positionFixed: false,
    placement,
    placementAuto
  };
}
