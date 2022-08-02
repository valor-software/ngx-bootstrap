/**
 * Returns the parentNode or the host of the element
 */
// todo: valorkin fix
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getParentNode(element: any): any {
  if (element.nodeName === 'HTML') {
    return element;
  }

  return element.parentNode || element.host;
}
