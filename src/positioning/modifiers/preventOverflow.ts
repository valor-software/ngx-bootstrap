import { getBoundaries } from '../utils';
import { Offsets } from '../models';

export function preventOverflow(
  target: HTMLElement,
  host: HTMLElement,
  offsetsTarget: Offsets
) {

  // NOTE: DOM access here
  // resets the targetOffsets's position so that the document size can be calculated excluding
  // the size of the targetOffsets element itself
  const transformProp = 'transform';
  const targetStyles = target.style; // assignment to help minification
  const { top, left, [transformProp]: transform } = targetStyles;
  targetStyles.top = '';
  targetStyles.left = '';
  targetStyles[transformProp] = '';

  const boundaries = getBoundaries(
    target,
    host,
    0, // padding
    'scrollParent',
    false // positionFixed
  );

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  targetStyles.top = top;
  targetStyles.left = left;
  targetStyles[transformProp] = transform;

  const order = ['left', 'right', 'top', 'bottom'];
  let targetOffsets = offsetsTarget;

  const check = {
    primary(placement: string) {
      let value = targetOffsets[placement];
      if (
        targetOffsets[placement] < boundaries[placement] &&
        !false // options.escapeWithReference
      ) {
        value = Math.max(targetOffsets[placement], boundaries[placement]);
      }

      return { [placement]: value };
    },
    secondary(placement: string) {
      const mainSide = placement === 'right' ? 'left' : 'top';
      let value = targetOffsets[mainSide];
      if (
        targetOffsets[placement] > boundaries[placement] &&
        !false // escapeWithReference
      ) {
        value = Math.min(
          targetOffsets[mainSide],
          boundaries[placement] -
          (placement === 'right' ? targetOffsets.width : targetOffsets.height)
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

    targetOffsets = { ...targetOffsets, ...check[side](placement) };

  });

  return targetOffsets;
}
