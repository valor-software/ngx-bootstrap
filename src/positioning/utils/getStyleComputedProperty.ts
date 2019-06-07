/**
 * Get CSS computed property of the given element
 */
export function getStyleComputedProperty(element: HTMLElement, property?: string): any {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  const window = element.ownerDocument.defaultView;
  const css = window.getComputedStyle(element, null);

  return property ? css[property as any] : css;
}
