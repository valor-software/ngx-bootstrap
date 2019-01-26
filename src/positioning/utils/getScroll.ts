/**
 * Gets the scroll value of the given element in the given side (top and left)
 */
export function getScroll(element: HTMLElement, side = 'top') {
  const upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  const nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    const html = element.ownerDocument.documentElement;
    const scrollingElement = element.ownerDocument.scrollingElement || html;

    return scrollingElement[upperSide];
  }

  return element[upperSide];
}
