import { getClientRect, getOuterSizes, getStyleComputedProperty } from '../utils';
import { Data } from '../models';

export function arrow(data: Data) {
  let targetOffsets = data.offsets.target;
  // if arrowElement is a string, suppose it's a CSS selector
  const arrowElement: HTMLElement | null = data.instance.target.querySelector('.arrow');

  // if arrowElement is not found, don't run the modifier
  if (!arrowElement) {
    return data;
  }

  const isVertical = ['left', 'right'].indexOf(data.placement) !== -1;

  const len = isVertical ? 'height' : 'width';
  const sideCapitalized = isVertical ? 'Top' : 'Left';
  const side = sideCapitalized.toLowerCase();
  const altSide = isVertical ? 'left' : 'top';
  const opSide = isVertical ? 'bottom' : 'right';
  const arrowElementSize = getOuterSizes(arrowElement)[len];

  // top/left side
  if (data.offsets.host[opSide] - arrowElementSize < (targetOffsets as any)[side]) {
    (targetOffsets as any)[side] -=
      (targetOffsets as any)[side] - (data.offsets.host[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (Number((data as any).offsets.host[side]) + Number(arrowElementSize) > (targetOffsets as any)[opSide]) {
    (targetOffsets as any)[side] +=
      Number((data as any).offsets.host[side]) + Number(arrowElementSize) - Number((targetOffsets as any)[opSide]);
  }
  targetOffsets = getClientRect(targetOffsets);

  // compute center of the target
  const center = Number((data as any).offsets.host[side]) + Number(data.offsets.host[len] / 2 - arrowElementSize / 2);

  // Compute the sideValue using the updated target offsets
  // take target margin in account because we don't have this info available
  const css = getStyleComputedProperty(data.instance.target);

  const targetMarginSide = parseFloat(css[`margin${sideCapitalized}`]);
  const targetBorderSide = parseFloat(css[`border${sideCapitalized}Width`]);
  let sideValue =
    center - (targetOffsets as any)[side] - targetMarginSide - targetBorderSide;

  // prevent arrowElement from being placed not contiguously to its target
  sideValue = Math.max(Math.min(targetOffsets[len] - arrowElementSize, sideValue), 0);

  data.offsets.arrow = {
    [side]: Math.round(sideValue),
    [altSide]: '' // make sure to unset any eventual altSide value from the DOM node
  };

  data.instance.arrow = arrowElement;

  return data;
}
