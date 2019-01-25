import { getBoundaries, getOffsetParent } from '../utils';

export function preventOverflow(boundariesEl, tooltip, reference, offsetsPopper) {
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

  let side: string;

  order.forEach(placement => {
    side = ['left', 'top']
      .indexOf(placement) !== -1
      ? 'primary'
      : 'secondary';

    popper = { ...popper, ...check[side](placement) };

  });

  offsetsPopper = popper;

  return offsetsPopper;
}
