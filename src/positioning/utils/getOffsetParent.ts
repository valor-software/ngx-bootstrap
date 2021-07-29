/**
 * Returns the offset parent of the given element
 */
import { getStyleComputedProperty } from './getStyleComputedProperty';
import { isIE } from './isIE';

export function getOffsetParent(element: HTMLElement): HTMLElement {
  if (!element) {
    return document.documentElement;
  }

  const noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  let offsetParent = element?.offsetParent;

  // Skip hidden elements which don't have an offsetParent
  let sibling: HTMLElement | undefined = void 0;

  while (offsetParent === noOffsetParent
         && element.nextElementSibling
         && sibling !== element.nextElementSibling) {

      // todo: valorkin fix
      sibling = element.nextElementSibling as HTMLElement;
      offsetParent = sibling.offsetParent;
    }

  const nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return sibling ? sibling.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  if (
    offsetParent &&
    ['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 &&
    getStyleComputedProperty(offsetParent, 'position') === 'static'
  ) {
    return getOffsetParent(offsetParent as HTMLElement);
  }

  return offsetParent as HTMLElement;
}
