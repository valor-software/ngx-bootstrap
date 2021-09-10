import { getBoundaries, isModifierEnabled } from '../utils';
import { Data, Offsets } from '../models';

export function preventOverflow(data: Data) {

  if (!isModifierEnabled(data.options, 'preventOverflow')) {
    return data;
  }

  // NOTE: DOM access here
  // resets the target Offsets's position so that the document size can be calculated excluding
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
    data.options.modifiers.preventOverflow?.boundariesElement || 'scrollParent',
    false // positionFixed
  );

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  targetStyles.top = top;
  targetStyles.left = left;
  targetStyles[transformProp] = transform;

  const order = ['left', 'right', 'top', 'bottom'];

  const check = {
    primary(placement: keyof Offsets) {
      let value = data.offsets.target[placement];
      // options.escapeWithReference
      if ((data.offsets.target[placement] ?? 0) < (boundaries[placement] ?? 0)) {
        value = Math.max(data.offsets.target[placement] ?? 0, boundaries[placement] ?? 0);
      }

      return { [placement]: value };
    },
    secondary(placement: keyof Offsets) {
      const mainSide = placement === 'right' ? 'left' : 'top';
      let value = data.offsets.target[mainSide];

      // escapeWithReference
      if ((data.offsets.target[placement] ?? 0) < (boundaries[placement] ?? 0) && placement !== 'right') {
        value = Math.min(
          data.offsets.target[mainSide] ?? 0,
          (boundaries[placement] ?? 0) - data.offsets.target.height);
      }

      if ((data.offsets.target[placement] ?? 0) > (boundaries[placement] ?? 0) && placement === 'right') {
        value = Math.min(
          data.offsets.target[mainSide] ?? 0,
          (boundaries[placement] ?? 0) - data.offsets.target.width);
      }

      return { [mainSide]: value };
    }
  };


  order.forEach((placement ) => {
    const side = ['left', 'top', 'start'].indexOf(placement) !== -1 ? check['primary'] : check['secondary'];

    data.offsets.target = {
      ...data.offsets.target,
      ...side(placement as keyof Offsets)
    };

  });

  return data;
}
