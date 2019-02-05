import { getClientRect, getOuterSizes, getStyleComputedProperty, setStyles } from '../utils';
import { Offsets } from '../models';

export function arrow(
  target: HTMLElement,
  offsetsTarget: Offsets,
  hostOffset: Offsets,
  arrowElementClass: string,
  placement: string
) {

  let targetOffsets = offsetsTarget;
  // if arrowElement is a string, suppose it's a CSS selector
  const arrowElement: HTMLElement | null = target.querySelector(arrowElementClass);

  // if arrowElement is not found, don't run the modifier
  if (!arrowElement) {
    return offsetsTarget;
  }

  const isVertical = ['left', 'right'].indexOf(placement) !== -1;

  const len = isVertical ? 'height' : 'width';
  const sideCapitalized = isVertical ? 'Top' : 'Left';
  const side = sideCapitalized.toLowerCase();
  const altSide = isVertical ? 'left' : 'top';
  const opSide = isVertical ? 'bottom' : 'right';
  const arrowElementSize = getOuterSizes(arrowElement)[len];

  // top/left side
  if (hostOffset[opSide] - arrowElementSize < targetOffsets[side]) {
    targetOffsets[side] -=
      targetOffsets[side] - (hostOffset[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (Number(hostOffset[side]) + Number(arrowElementSize) > targetOffsets[opSide]) {
    targetOffsets[side] +=
      Number(hostOffset[side]) + Number(arrowElementSize) - Number(targetOffsets[opSide]);
  }
  targetOffsets = getClientRect(targetOffsets);

  // compute center of the target
  const center = Number(hostOffset[side]) + Number(hostOffset[len] / 2 - arrowElementSize / 2);

  // Compute the sideValue using the updated target offsets
  // take target margin in account because we don't have this info available
  const css = getStyleComputedProperty(target);

  const targetMarginSide = parseFloat(css[`margin${sideCapitalized}`]);
  const targetBorderSide = parseFloat(css[`border${sideCapitalized}Width`]);
  let sideValue =
    center - targetOffsets[side] - targetMarginSide - targetBorderSide;

  // prevent arrowElement from being placed not contiguously to its target
  sideValue = Math.max(Math.min(targetOffsets[len] - arrowElementSize, sideValue), 0);

  const offsetsArrow: { [key: string]: string | number | HTMLElement } = {
    [side]: Math.round(sideValue),
    [altSide]: '' // make sure to unset any eventual altSide value from the DOM node
  };

  offsetsArrow.arrowElement = arrowElement;

  setStyles(arrowElement, offsetsArrow);

  return offsetsTarget;
}
