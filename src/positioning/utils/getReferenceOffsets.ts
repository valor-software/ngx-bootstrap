/**
 * Get offsets to the reference element
 */
import { findCommonOffsetParent } from './findCommonOffsetParent';
import { getOffsetRectRelativeToArbitraryNode } from './getOffsetRectRelativeToArbitraryNode';
import { getFixedPositionOffsetParent } from './getFixedPositionOffsetParent';
import { Offsets } from '../models';

export function getReferenceOffsets(
  target: HTMLElement,
  host: HTMLElement,
  fixedPosition?: boolean
): Offsets {
  const commonOffsetParent = fixedPosition
    ? getFixedPositionOffsetParent(target)
    : findCommonOffsetParent(target, host);

  return getOffsetRectRelativeToArbitraryNode(host, commonOffsetParent, fixedPosition);
}
