/**
 * Set the style to the given popper
 */
import { Renderer2 } from '@angular/core';

import { Data } from '../models';
import { getOffsets, setStyles } from './index';

export function setAllStyles(data: Data, renderer?: Renderer2): void {
  const target = data.instance.target;

  const offsets = getOffsets(data);

  setStyles(target, {
    'will-change': 'transform',
    top: '0px',
    left: '0px',
    transform: `translate3d(${offsets.left}px, ${offsets.top}px, 0px)`
  }, renderer);

  if (data.instance.arrow) {
    setStyles(data.instance.arrow, data.offsets.arrow, renderer);
  }

  if (data.placementAuto) {
    if (renderer) {
      renderer.setAttribute(target, 'class',
        target.className.replace(/bs-popover-auto/g, `bs-popover-${data.placement}`)
      );
      renderer.setAttribute(target, 'class',
        target.className.replace(/bs-tooltip-auto/g, `bs-tooltip-${data.placement}`)
      );

      renderer.setAttribute(target, 'class',
        target.className.replace(/\sauto/g, `\s${data.placement}`)
      );

      if (target.className.match(/popover/g)) {
        renderer.addClass(target, 'popover-auto');
      }

      if (target.className.match(/tooltip/g)) {
        renderer.addClass(target, 'tooltip-auto');
      }


    } else {
      target.className = target.className.replace(/bs-popover-auto/g, `bs-popover-${data.placement}`);
      target.className = target.className.replace(/bs-tooltip-auto/g, `bs-tooltip-${data.placement}`);
      target.className = target.className.replace(/\sauto/g, `\s${data.placement}`);

      if (target.className.match(/popover/g)) {
        target.classList.add('popover-auto');
      }

      if (target.className.match(/tooltip/g)) {
        target.classList.add('tooltip-auto');
      }
    }
  }

  if (renderer) {
    renderer.setAttribute(target, 'class', target.className.replace(/left|right|top|bottom/g, `${data.placement}`));
  } else {
    target.className = target.className.replace(/left|right|top|bottom/g, `${data.placement}`);
  }
}
