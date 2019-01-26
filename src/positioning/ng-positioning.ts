/**
 * @copyright Valor Software
 * @copyright Federico Zivolo and contributors
 */
import {
  computeAutoPlacement,
  getClientRect,
  getPopperOffsets,
  getReferenceOffsets
} from './utils';

import { arrow, flip, preventOverflow, shift } from './modifiers';

export class Positioning {
  position(hostElement: HTMLElement, targetElement: HTMLElement, round = true): { [key: string]: number } {
    return this.offset(hostElement, targetElement, false);
  }

  offset(hostElement: HTMLElement, targetElement: HTMLElement, round = true): { [key: string]: number } {
    return getReferenceOffsets(targetElement, hostElement);
  }


  positionElements(
    hostElement: HTMLElement,   // button or reference
    targetElement: HTMLElement, // tooltip or popper
    position: string,
    appendToBody?: boolean
  ): { [key: string]: number } {

    const hostElPosition = this.offset(hostElement, targetElement, false);

    const placement = computeAutoPlacement(
      position,
      hostElPosition,
      targetElement,
      hostElement,
      'viewport',
      0
    );

    let targetElPosition: { [key: string]: number } = getPopperOffsets(targetElement, hostElPosition, placement);
    targetElPosition = getClientRect(targetElPosition);
    targetElPosition = flip(targetElement, hostElement, targetElPosition, hostElPosition, placement);
    targetElPosition = preventOverflow(targetElement, hostElement, targetElPosition);
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
