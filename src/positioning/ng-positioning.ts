/**
 * @copyright Valor Software
 * @copyright Federico Zivolo and contributors
 */
import { Renderer2 } from '@angular/core';

import { getOffsets, getReferenceOffsets, updateContainerClass, setStyles } from './utils';

import { arrow, flip, preventOverflow, shift, initData } from './modifiers';
import { Data, Offsets, Options } from './models';


export class Positioning {
  position(hostElement: HTMLElement, targetElement: HTMLElement, round = true): Offsets {
    return this.offset(hostElement, targetElement, false);
  }

  offset(hostElement: HTMLElement, targetElement: HTMLElement, round = true): Offsets {
    return getReferenceOffsets(targetElement, hostElement);
  }

  positionElements(
    hostElement: HTMLElement,
    targetElement: HTMLElement,
    position: string,
    appendToBody?: boolean,
    options?: Options
  ): Data {
    const chainOfModifiers = [flip, shift, preventOverflow, arrow];

    return chainOfModifiers.reduce(
      (modifiedData, modifier) => modifier(modifiedData),
      initData(targetElement, hostElement, position, options)
    );
  }
}

const positionService = new Positioning();

export function positionElements(
  hostElement: HTMLElement,
  targetElement: HTMLElement,
  placement: string,
  appendToBody?: boolean,
  options?: Options,
  renderer?: Renderer2
): void {

  const data = positionService.positionElements(
    hostElement,
    targetElement,
    placement,
    appendToBody,
    options
  );

  const offsets = getOffsets(data);

  setStyles(targetElement, {
    'will-change': 'transform',
    top: '0px',
    left: '0px',
    transform: `translate3d(${offsets.left}px, ${offsets.top}px, 0px)`
  }, renderer);

  if (data.instance.arrow) {
    setStyles(data.instance.arrow, data.offsets.arrow, renderer);
  }

  updateContainerClass(data, renderer);
}
