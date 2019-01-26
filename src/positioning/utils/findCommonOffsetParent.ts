/**
 * Finds the offset parent common to the two provided nodes
 */
import { isOffsetContainer } from './isOffsetContainer';
import { getRoot } from './getRoot';
import { getOffsetParent } from './getOffsetParent';

export function findCommonOffsetParent(element1: HTMLElement, element2: HTMLElement): any {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  /* tslint:disable-next-line: no-bitwise */
  const order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;

  const start = order ? element1 : element2;
  const end = order ? element2 : element1;

  // Get common ancestor container
  const range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  const { commonAncestorContainer } = range;

  // Both nodes are inside #document
  if (
    (element1 !== commonAncestorContainer &&
      element2 !== commonAncestorContainer) ||
    start.contains(end)
  ) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  const element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}
