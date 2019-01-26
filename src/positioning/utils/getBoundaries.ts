/**
 * Computed the boundaries limits and return them
 */
import { getScrollParent } from './getScrollParent';
import { getParentNode } from './getParentNode';
import { findCommonOffsetParent } from './findCommonOffsetParent';
import { getOffsetRectRelativeToArbitraryNode } from './getOffsetRectRelativeToArbitraryNode';
import { getViewportOffsetRectRelativeToArtbitraryNode } from './getViewportOffsetRectRelativeToArtbitraryNode';
import { getWindowSizes } from './getWindowSizes';
import { isFixed } from './isFixed';
import { getFixedPositionOffsetParent } from './getFixedPositionOffsetParent';

export function getBoundaries(
  popper: HTMLElement,
  reference: HTMLElement,
  paddingValue: any,
  boundariesElement: string,
  fixedPosition = false
) {
  // NOTE: 1 DOM access here

  let boundaries: any = { top: 0, left: 0 };
  const offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    let boundariesNode;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    const offsets = getOffsetRectRelativeToArbitraryNode(
      boundariesNode,
      offsetParent,
      fixedPosition
    );

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      const { height, width } = getWindowSizes(popper.ownerDocument);
      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = Number(height) + Number(offsets.top);
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = Number(width) + Number(offsets.left);
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  const padding = paddingValue || 0;
  const isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}
