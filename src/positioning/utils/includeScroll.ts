/**
 * Sum or subtract the element scroll values (left and top) from a given rect object
 */
import { getScroll } from './getScroll';
import { Offsets } from '../models';
import { isNumber } from './isNumeric';

export function includeScroll(rect: Offsets, element: HTMLElement, subtract = false) {
  const scrollTop = getScroll(element, 'top');
  const scrollLeft = getScroll(element, 'left');
  const modifier = subtract ? -1 : 1;
  if (isNumber(rect.top)) {
    rect.top += scrollTop * modifier;
  }
  if (isNumber(rect.bottom)) {
    rect.bottom += scrollTop * modifier;
  }

  if (isNumber(rect.left)) {
    rect.left += scrollLeft * modifier;
  }
  if (isNumber(rect.right)) {
    rect.right += scrollLeft * modifier;
  }

  return rect;
}
