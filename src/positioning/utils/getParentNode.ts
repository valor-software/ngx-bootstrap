/**
 * Returns the parentNode or the host of the element
 */
export function getParentNode(element: any): any {
  if (element.nodeName === 'HTML') {
    return element;
  }

  return element.parentNode || element.host;
}
