/**
 * Update class for the given popper
 */
import { Renderer2 } from '@angular/core';
import { Data } from '../models';

export function updateContainerClass(data: Data, renderer?: Renderer2): void {
  const target = data.instance.target;

  let containerClass = target.className;

  if (data.placementAuto) {
    containerClass = containerClass.replace(/bs-popover-auto/g, `bs-popover-${data.placement}`);
    containerClass = containerClass.replace(/bs-tooltip-auto/g, `bs-tooltip-${data.placement}`);
    containerClass = containerClass.replace(/\sauto/g, ` ${data.placement}`);

    if (containerClass.indexOf('popover') !== -1 && containerClass.indexOf('popover-auto') === -1) {
      containerClass += ' popover-auto';
    }

    if (containerClass.indexOf('tooltip') !== -1  && containerClass.indexOf('tooltip-auto') === -1) {
      containerClass += ' tooltip-auto';
    }
  }

  containerClass = containerClass.replace(/left|right|top|bottom/g, `${data.placement.split(' ')[0]}`);

  if (renderer) {
    renderer.setAttribute(target, 'class', containerClass);

    return;
  }

  target.className = containerClass;
}
