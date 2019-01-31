/**
 * @copyright Valor Software
 * @copyright Federico Zivolo and contributors
 */
import {
  computeAutoPlacement,
  getClientRect,
  getTargetOffsets,
  getReferenceOffsets, setStyles
} from './utils';

import { updateArrowPosition, flip, preventOverflow, shift } from './modifiers';
import { roundOffset } from './utils/roundOffset';
import { Offsets } from './models';

export class Positioning {
  position(hostElement: HTMLElement, targetElement: HTMLElement, round = true): Offsets {
    return this.offset(hostElement, targetElement, false);
  }

  offset(hostElement: HTMLElement, targetElement: HTMLElement, round = true): Offsets {
    return getReferenceOffsets(targetElement, hostElement);
  }

  positionElements(
    hostElement: HTMLElement,   // button or reference
    targetElement: HTMLElement, // tooltip or popper
    position: string,
    appendToBody?: boolean
  ): Offsets {
    const hostElPosition = this.offset(hostElement, targetElement, false);
    const placement = computeAutoPlacement(position, hostElPosition, targetElement, hostElement, 'viewport', 0);
    const targetElPosition: Offsets = getTargetOffsets(targetElement, hostElPosition, placement);

    updateArrowPosition(targetElement, targetElPosition, hostElPosition, '.arrow', placement);

    const chainOfModifiers = [
      getClientRect,
      (targetPosition: Offsets) => flip(targetElement, hostElement, targetPosition, hostElPosition, placement),
      (targetPosition: Offsets) => preventOverflow(targetElement, hostElement, targetPosition),
      (targetPosition: Offsets) => shift(targetPosition, hostElPosition, placement),
      roundOffset
    ];

    return chainOfModifiers.reduce((targetPosition, modifier) => {
      return modifier(targetPosition);
    }, targetElPosition);
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

  setStyles(targetElement, {
    'will-change': 'transform',
    top: '0px',
    left: '0px',
    transform: `translate3d(${pos.left}px, ${pos.top}px, 0px)`
  });
}
