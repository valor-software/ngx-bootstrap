/**
 * @copyright Valor Software
 * @copyright popper.js team
 */
import {
  computeAutoPlacement,
  getClientRect,
  getPopperOffsets,
  getReferenceOffsets
} from './utils';

import { arrow, flip, preventOverflow, shift } from './modifiers';

export class Positioning {
  position(hostElement: HTMLElement, targetElement: HTMLElement, round = true): ClientRect {
    return this.offset(hostElement, targetElement, false);
  }

  offset(hostElement: HTMLElement, targetElement: HTMLElement, round = true): ClientRect {
    return getReferenceOffsets({}, targetElement, hostElement);
  }


  positionElements(
    hostElement: HTMLElement,   // button or reference
    targetElement: HTMLElement, // tooltip or popper
    placement: string,
    appendToBody?: boolean
  ): ClientRect {

    const hostElPosition = this.offset(hostElement, targetElement, false);

    placement = computeAutoPlacement(
      placement,
      hostElPosition,
      targetElement,
      hostElement,
      'viewport',
      0
    );

    let targetElPosition: any = getPopperOffsets(targetElement, hostElPosition, placement);
    targetElPosition = getClientRect(targetElPosition);
    targetElPosition = flip('viewport', targetElement, hostElement, targetElPosition, hostElPosition, placement);
    targetElPosition = preventOverflow('scrollParent', targetElement, hostElement, targetElPosition);
    arrow(targetElement, targetElPosition, hostElPosition, '.arrow', placement);
    targetElPosition = shift(targetElPosition, hostElPosition, placement);

    return targetElPosition;
  }
}

const positionService = new Positioning();

export function positionElements(
  hostElement: HTMLElement,
  targetElement: HTMLElement,
  placement: string,
  appendToBody?: boolean
): void {

  const pos = positionService.positionElements(
    hostElement,
    targetElement,
    placement,
    appendToBody
  );

  targetElement.style['will-change'] = 'transform';
  targetElement.style.top = '0px';
  targetElement.style.left = '0px';
  targetElement.style.transform = `translate3d(${pos.left}px, ${pos.top}px, 0px)`;
}
