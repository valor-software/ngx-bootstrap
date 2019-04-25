import { getBoundingClientRect } from './getBoundingClientRect';
import { getClientRect } from './getClientRect';
import { getScrollParent } from './getScrollParent';
import { getStyleComputedProperty } from './getStyleComputedProperty';
import { includeScroll } from './includeScroll';
import { isIE as runIsIE } from './isIE';
import { Offsets } from '../models';

export function getOffsetRectRelativeToArbitraryNode(
  children: HTMLElement,
  parent: HTMLElement,
  fixedPosition = false
): Offsets {
  const isIE10 = runIsIE(10);
  const isHTML = parent.nodeName === 'HTML';
  const childrenRect: any = getBoundingClientRect(children);
  const parentRect: any = getBoundingClientRect(parent);
  const scrollParent = getScrollParent(children);

  const styles = getStyleComputedProperty(parent);
  const borderTopWidth = parseFloat(styles.borderTopWidth);
  const borderLeftWidth = parseFloat(styles.borderLeftWidth);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }

  let offsets: Offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });

  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    const marginTop = parseFloat(styles.marginTop);
    const marginLeft = parseFloat(styles.marginLeft);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (
    isIE10 && !fixedPosition
      ? parent.contains(scrollParent)
      : parent === scrollParent && scrollParent.nodeName !== 'BODY'
  ) {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}
