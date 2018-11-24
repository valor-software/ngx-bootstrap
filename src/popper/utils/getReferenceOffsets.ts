import { findCommonOffsetParent } from './findCommonOffsetParent';
import { getOffsetRectRelativeToArbitraryNode } from './getOffsetRectRelativeToArbitraryNode';
import { getFixedPositionOffsetParent } from './getFixedPositionOffsetParent';

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 */
export function getReferenceOffsets(state, popper, reference, fixedPosition = null) {
  const commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}
