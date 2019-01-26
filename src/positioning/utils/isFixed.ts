/**
 * Check if the given element is fixed or is inside a fixed parent
 */
import { getStyleComputedProperty } from './getStyleComputedProperty';
import { getParentNode } from './getParentNode';

export function isFixed(element: HTMLElement): boolean {
  const nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }

  return isFixed(getParentNode(element));
}
