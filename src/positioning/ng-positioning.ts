/**
 * @copyright Valor Software
 * @copyright popper.js team
 */

import {
  computeAutoPlacement,
  getBoundaries,
  getBoundingClientRect,
  getOffsetParent,
  getPopperOffsets,
  getReferenceOffsets,
  getOppositePlacement,
  getOppositeVariation
} from 'ngx-bootstrap/popper';

// previous version:`
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
// tslint:disable
export class Positioning {

  public position(element: HTMLElement, round = true): ClientRect {
    let elPosition: ClientRect;
    // let parentOffset: ClientRect = {
    //   width: 0,
    //   height: 0,
    //   top: 0,
    //   bottom: 0,
    //   left: 0,
    //   right: 0
    // };
    //
    // if (this.getStyle(element, 'position') === 'fixed') {
    //
    //   const bcRect = element.getBoundingClientRect();
    //   elPosition = {
    //     width: bcRect.width,
    //     height: bcRect.height,
    //     top: bcRect.top,
    //     bottom: bcRect.bottom,
    //     left: bcRect.left,
    //     right: bcRect.right
    //   };
    // } else {
    //   const offsetParentEl = this.offsetParent(element);
    //
    //   elPosition = this.offset(element, false);
    //
    //   if (offsetParentEl !== document.documentElement) {
    //     parentOffset = this.offset(offsetParentEl, false);
    //   }
    //
    //   parentOffset.top += offsetParentEl.clientTop;
    //   parentOffset.left += offsetParentEl.clientLeft;
    // }
    //
    // elPosition.top -= parentOffset.top;
    // elPosition.bottom -= parentOffset.top;
    // elPosition.left -= parentOffset.left;
    // elPosition.right -= parentOffset.left;
    //
    // if (round) {
    //   elPosition.top = Math.round(elPosition.top);
    //   elPosition.bottom = Math.round(elPosition.bottom);
    //   elPosition.left = Math.round(elPosition.left);
    //   elPosition.right = Math.round(elPosition.right);
    // }
    //
    return elPosition;
  }

  preventOverflow(boundariesEl, tooltip, reference, offsetsPopper) {
    let boundariesElement =
      boundariesEl || getOffsetParent(tooltip);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    const transformProp = 'transform';
    const popperStyles = tooltip.style; // assignment to help minification
    const { top, left, [transformProp]: transform } = popperStyles;
    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    const boundaries = getBoundaries(
      tooltip,
      reference,
      0, // options.padding
      boundariesElement,
      false // data.positionFixed
    );

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    // options.boundaries = boundaries;

    const order = ['left', 'right', 'top', 'bottom'];
    let popper = offsetsPopper;

    const check = {
      primary(placement) {
        let value = popper[placement];
        if (
          popper[placement] < boundaries[placement] &&
          !false // options.escapeWithReference
        ) {
          value = Math.max(popper[placement], boundaries[placement]);
        }

        return { [placement]: value };
      },
      secondary(placement) {
        const mainSide = placement === 'right' ? 'left' : 'top';
        let value = popper[mainSide];
        if (
          popper[placement] > boundaries[placement] &&
          !false // options.escapeWithReference
        ) {
          value = Math.min(
            popper[mainSide],
            boundaries[placement] -
            (placement === 'right' ? popper.width : popper.height)
          );
        }

        return { [mainSide]: value };
      }
    };

    order.forEach(placement => {
      const side = ['left', 'top']
        .indexOf(placement) !== -1
        ? 'primary'
        : 'secondary';

      popper = { ...popper, ...check[side](placement) };
    });

    offsetsPopper = popper;

    return offsetsPopper;
  }

  flip(boundariesEl, tooltip, reference, offsetsPopper, referenceOffsets, inputPlacement) {
    let boundariesElement =
      boundariesEl || getOffsetParent(tooltip);

    const boundaries = getBoundaries(
      tooltip,
      reference,
      5, // options.padding
      boundariesElement,
      false // data.positionFixed
    );

    let placement = inputPlacement.split('-')[0];
    let placementOpposite = getOppositePlacement(placement);
    let variation = inputPlacement.split('-')[1] || '';

    let flipOrder = [];

    flipOrder = [placement, placementOpposite];

    /* tslint:disable-next-line: cyclomatic-complexity */
    flipOrder.forEach((step, index) => {
      if (placement !== step || flipOrder.length === index + 1) {
        return placement;
      }

      placement = inputPlacement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      const popperOffsets = referenceOffsets;
      const refOffsets = offsetsPopper;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      const floor = Math.floor;
      const overlapsRef =
        (placement === 'left' &&
          floor(popperOffsets.right) > floor(refOffsets.left)) ||
        (placement === 'right' &&
          floor(popperOffsets.left) < floor(refOffsets.right)) ||
        (placement === 'top' &&
          floor(popperOffsets.bottom) > floor(refOffsets.top)) ||
        (placement === 'bottom' &&
          floor(popperOffsets.top) < floor(refOffsets.bottom));

      const overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      const overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      const overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      const overflowsBottom =
        floor(popperOffsets.bottom) > floor(boundaries.bottom);

      const overflowsBoundaries =
        (placement === 'left' && overflowsLeft) ||
        (placement === 'right' && overflowsRight) ||
        (placement === 'top' && overflowsTop) ||
        (placement === 'bottom' && overflowsBottom);

      // flip the variation if required
      const isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      const flippedVariation =
        ((isVertical && variation === 'start' && overflowsLeft) ||
          (isVertical && variation === 'end' && overflowsRight) ||
          (!isVertical && variation === 'start' && overflowsTop) ||
          (!isVertical && variation === 'end' && overflowsBottom));

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        // data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        placement = placement + (variation ? `-${variation}` : '');
      }
    });

    console.log(placement);

    return placement;
  }


  public positionElements(
    hostElement: HTMLElement,   // button or reference
    targetElement: HTMLElement, // tooltip or popper
    placement: string,
    appendToBody?: boolean
  ): ClientRect {

    const referenceOffsets = getReferenceOffsets({}, targetElement, hostElement);
    const autoPlacement = computeAutoPlacement(
      placement,
      referenceOffsets,
      targetElement,
      hostElement,
      'viewport',
      0
    );

    const popperOffsets: any = getPopperOffsets(targetElement, referenceOffsets, autoPlacement);

    const overPlacement = this.preventOverflow('scrollParent', targetElement, hostElement, popperOffsets);


    window.addEventListener('scroll', () => this.flip('viewport', targetElement, hostElement, popperOffsets, referenceOffsets, placement), true);
    window.addEventListener('resize', () => this.flip('viewport', targetElement, hostElement, popperOffsets, referenceOffsets, placement), true);

    // const hostElPosition = appendToBody
    //   ? this.offset(hostElement, false)
    //   : this.position(hostElement, false);
    // const targetElStyles = this.getAllStyles(targetElement);
    // const targetElBCR = targetElement.getBoundingClientRect();
    // let placementPrimary = placement.split(' ')[0] || 'top';
    // const placementSecondary = placement.split(' ')[1] || 'center';

    let targetElPosition: any = {
      height: 0,
      width: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };

    targetElPosition.top = Math.round(popperOffsets.top);
    targetElPosition.left = Math.round(popperOffsets.left);

    const offsetParent = getOffsetParent(hostElement);

    const offsets: any = {
      width: popperOffsets.width,
      height: popperOffsets.height,
      left: Math.floor(popperOffsets.left),
      top: Math.round(popperOffsets.top),
      bottom: Math.round(popperOffsets.bottom),
      right: Math.floor(popperOffsets.right)
    };

    return offsets;
  }
}

const positionService = new Positioning();

export function positionElements(
  hostElement: HTMLElement,
  targetElement: HTMLElement,
  placement: string,
  appendToBody?: boolean
): void {
  const pos = positionService.positionElements(
    hostElement,
    targetElement,
    placement,
    appendToBody
  );

  targetElement.style.top = `${pos.top}px`;
  targetElement.style.left = `${pos.left}px`;
}
