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

import { updateArrowPosition, flip, preventOverflow, shift } from './modifiers';
import { roundOffset } from './utils/roundOffset';

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
  ): ClientRect {

    const hostElPosition = this.offset(hostElement, targetElement, false);

    const placement = computeAutoPlacement(position, hostElPosition, targetElement, hostElement, 'viewport', 0);

    let targetElPosition: any = getPopperOffsets(targetElement, hostElPosition, placement);

    updateArrowPosition(targetElement, targetElPosition, hostElPosition, '.arrow', placement);

    targetElPosition = getClientRect(targetElPosition);
    targetElPosition = flip(targetElement, hostElement, targetElPosition, hostElPosition, placement);
    targetElPosition = preventOverflow(targetElement, hostElement, targetElPosition);
    targetElPosition = shift(targetElPosition, hostElPosition, placement);

    return roundOffset(targetElPosition);
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
  targetElement.style.transform = `translate3d(${Math.floor(pos.left)}px, ${Math.floor(pos.top)}px, 0px)`;
}
