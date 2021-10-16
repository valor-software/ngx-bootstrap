/**
 * @copyright Valor Software
 * @copyright Federico Zivolo and contributors
 */
import { Renderer2 } from '@angular/core';
import { Data, Offsets, Options, MapPlacementInToRL } from './models';

import { arrow, flip, initData, preventOverflow, shift } from './modifiers';

import { getOffsets, getReferenceOffsets, setStyles, updateContainerClass } from './utils';


export class Positioning {
  position(hostElement: HTMLElement, targetElement: HTMLElement/*, round = true*/): Offsets | undefined {
    return this.offset(hostElement, targetElement/*, false*/);
  }

  offset(hostElement: HTMLElement, targetElement: HTMLElement/*, round = true*/): Offsets | undefined {
    return getReferenceOffsets(targetElement, hostElement);
  }

  positionElements(
    hostElement: HTMLElement | null,
    targetElement: HTMLElement | null,
    position: string,
    appendToBody?: boolean,
    options?: Options
  ): Data | undefined {
    const chainOfModifiers = [flip, shift, preventOverflow, arrow];
    const _position = MapPlacementInToRL[position as keyof typeof MapPlacementInToRL];
    const data = initData(targetElement, hostElement, _position, options);
    if (!data) {
      return;
    }

    return chainOfModifiers.reduce(
      (modifiedData, modifier) => modifier(modifiedData),
      data
    );
  }
}

const positionService = new Positioning();

export function positionElements(
  hostElement: HTMLElement | null,
  targetElement: HTMLElement | null,
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

  if (!data) {
    return;
  }

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
