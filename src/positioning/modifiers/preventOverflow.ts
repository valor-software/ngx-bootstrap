import { getBoundaries } from '../utils';

export function preventOverflow(
  tooltip: HTMLElement,
  reference: HTMLElement,
  offsetsPopper: { [key: string]: number }
) {

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
    0, // padding
    'scrollParent',
    false // positionFixed
  );

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  const order = ['left', 'right', 'top', 'bottom'];
  let popper = offsetsPopper;

  const check = {
    primary(placement: string) {
      let value = popper[placement];
      if (
        popper[placement] < boundaries[placement] &&
        !false // options.escapeWithReference
      ) {
        value = Math.max(popper[placement], boundaries[placement]);
      }

      return { [placement]: value };
    },
    secondary(placement: string) {
      const mainSide = placement === 'right' ? 'left' : 'top';
      let value = popper[mainSide];
      if (
        popper[placement] > boundaries[placement] &&
        !false // escapeWithReference
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

  return popper;
}
