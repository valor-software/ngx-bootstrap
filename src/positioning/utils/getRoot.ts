/**
 * Finds the root node (document, shadowDOM root) of the given element
 */
export function getRoot(node: Node|ShadowRoot): Node|ShadowRoot {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}
