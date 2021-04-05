/**
 * Get the outer sizes of the given element (offset size + margins)
 */
import { Offsets } from '../models';

const parse = (value?: string, def = 0) => value ? parseFloat(value) : def;
export function getOuterSizes(element: HTMLElement): Offsets {
  const window = element.ownerDocument.defaultView;
  const styles = window?.getComputedStyle(element);
  const x = parse(styles?.marginTop) + parse(styles?.marginBottom);
  const y = parse(styles?.marginLeft) + parse(styles?.marginRight);

  return {
    width: Number(element.offsetWidth) + y,
    height: Number(element.offsetHeight) + x
  };
}
