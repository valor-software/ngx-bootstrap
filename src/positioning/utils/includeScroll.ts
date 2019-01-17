import { getScroll } from './getScroll';

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 */
export function includeScroll(rect, element, subtract = false) {
  const scrollTop = getScroll(element, 'top');
  const scrollLeft = getScroll(element, 'left');
  const modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;

  return rect;
}
