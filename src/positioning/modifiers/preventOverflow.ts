import { getBoundaries, isModifierEnabled } from '../utils';
import { Data } from '../models';

export function preventOverflow(data: Data) {

  if (!isModifierEnabled(data.options, 'preventOverflow')) {
    return data;
  }

  // NOTE: DOM access here
  // resets the targetOffsets's position so that the document size can be calculated excluding
  // the size of the targetOffsets element itself
  const transformProp = 'transform';
  const targetStyles = data.instance.target.style; // assignment to help minification
  const { top, left, [transformProp]: transform } = targetStyles;
  targetStyles.top = '';
  targetStyles.left = '';
  targetStyles[transformProp] = '';

  const boundaries = getBoundaries(
    data.instance.target,
    data.instance.host,
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

  const check = {
    primary(placement: string) {
      let value = (data as any).offsets.target[placement];
      if (
        (data as any).offsets.target[placement] < boundaries[placement] &&
        !false // options.escapeWithReference
      ) {
        value = Math.max((data as any).offsets.target[placement], boundaries[placement]);
      }

      return { [placement]: value };
    },
    secondary(placement: string) {
      const mainSide = placement === 'right' ? 'left' : 'top';
      let value = data.offsets.target[mainSide];
      if (
        (data as any).offsets.target[placement] > boundaries[placement] &&
        !false // escapeWithReference
      ) {
        value = Math.min(
          data.offsets.target[mainSide],
          boundaries[placement] -
          (placement === 'right' ? data.offsets.target.width : data.offsets.target.height)
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

    data.offsets.target = {
      ...data.offsets.target,
      ...(check as any)[side](placement)
    };

  });

  return data;
}
