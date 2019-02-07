/**
 * Set the style to the given popper
 */
import { Renderer2 } from '@angular/core';

import { isNumeric } from './isNumeric';

export function setStyles(element: HTMLElement, styles: any, renderer?: Renderer2) {
  Object.keys(styles).forEach((prop: any) => {
    let unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 &&
      isNumeric(styles[prop])) {
      unit = 'px';
    }

    if (renderer) {
      renderer.setStyle(element, prop, `${String(styles[prop])}${unit}`);

      return;
    }

    element.style[prop] = String(styles[prop]) + unit;
  });
}
