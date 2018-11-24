/**
 * Get the window associated with the element
 * @argument {Element} element
 */
export function getWindow(element) {
  const ownerDocument = element.ownerDocument;

  return ownerDocument ? ownerDocument.defaultView : window;
}
