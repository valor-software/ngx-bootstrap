/**
 * Get the outer sizes of the given element (offset size + margins)
 */
export function getOuterSizes(element: any) {
  const window = element.ownerDocument.defaultView;
  const styles = window.getComputedStyle(element);
  const x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  const y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);

  return {
    width: Number(element.offsetWidth) + y,
    height: Number(element.offsetHeight) + x
  };
}
