/**
 * Returns the offset parent of the given element
 */
import { getStyleComputedProperty } from './getStyleComputedProperty';
import { isIE } from './isIE';

export function getOffsetParent(element: any): any {
  if (!element) {
    return document.documentElement;
  }

  const noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  let offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent

  let sibling: any;

  while (offsetParent === noOffsetParent && element.nextElementSibling && element.nodeName !== 'BODY') {
    sibling = element.nextElementSibling;
    offsetParent = sibling.offsetParent;
  }

  const nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return sibling ? sibling.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (
    ['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 &&
    getStyleComputedProperty(offsetParent, 'position') === 'static'
  ) {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}
