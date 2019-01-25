import { getClientRect, getOuterSizes, getStyleComputedProperty } from '../utils';

export function arrow(popper, offsetsPopper, referenceOffset, arrowElement, placement) {
  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!popper.contains(arrowElement)) {
      console.warn(
        'WARNING: `arrow.element` must be child of its popper element!'
      );

      return;
    }
  }

  const isVertical = ['left', 'right'].indexOf(placement) !== -1;

  const len = isVertical ? 'height' : 'width';
  const sideCapitalized = isVertical ? 'Top' : 'Left';
  const side = sideCapitalized.toLowerCase();
  const altSide = isVertical ? 'left' : 'top';
  const opSide = isVertical ? 'bottom' : 'right';
  const arrowElementSize = getOuterSizes(arrowElement)[len];

  // top/left side
  if (referenceOffset[opSide] - arrowElementSize < offsetsPopper[side]) {
    offsetsPopper[side] -=
      offsetsPopper[side] - (referenceOffset[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (referenceOffset[side] + arrowElementSize > offsetsPopper[opSide]) {
    offsetsPopper[side] +=
      referenceOffset[side] + arrowElementSize - offsetsPopper[opSide];
  }
  offsetsPopper = getClientRect(offsetsPopper);

  // compute center of the popper
  const center = referenceOffset[side] + referenceOffset[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  const css = getStyleComputedProperty(popper);

  const popperMarginSide = parseFloat(css[`margin${sideCapitalized}`]);
  const popperBorderSide = parseFloat(css[`border${sideCapitalized}Width`]);
  let sideValue =
    center - offsetsPopper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(offsetsPopper[len] - arrowElementSize, sideValue), 0);

  const offsetsArrow = {
    [side]: Math.round(sideValue),
    [altSide]: '', // make sure to unset any eventual altSide value from the DOM node
  };

  offsetsArrow.arrowElement = arrowElement;

  arrowElement.style.top = `${offsetsArrow.top}px`;
  arrowElement.style.left = `${offsetsArrow.left}px`;

  return offsetsArrow;
}
