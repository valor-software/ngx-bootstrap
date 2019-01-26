/**
 * Sum or subtract the element scroll values (left and top) from a given rect object
 */
import { getScroll } from './getScroll';

export function includeScroll(rect: ClientRect, element: HTMLElement, subtract = false) {
  const scrollTop = getScroll(element, 'top');
  const scrollLeft = getScroll(element, 'left');
  const modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;

  return rect;
}
