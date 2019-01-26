/**
 * Get offsets to the reference element
 */
import { findCommonOffsetParent } from './findCommonOffsetParent';
import { getOffsetRectRelativeToArbitraryNode } from './getOffsetRectRelativeToArbitraryNode';
import { getFixedPositionOffsetParent } from './getFixedPositionOffsetParent';

export function getReferenceOffsets(popper: HTMLElement, reference: HTMLElement, fixedPosition: boolean = null) {
  const commonOffsetParent = fixedPosition
    ? getFixedPositionOffsetParent(popper)
    : findCommonOffsetParent(popper, reference);

  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}
