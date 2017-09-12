import { Injectable, ElementRef } from '@angular/core';
import { positionElements } from './ng-positioning';

export interface PositioningOptions {
  /** The DOM element, ElementRef, or a selector string of an element which will be moved */
  element?: HTMLElement | ElementRef | string;

  /** The DOM element, ElementRef, or a selector string of an element which the element will be attached to  */
  target?: HTMLElement | ElementRef | string;

  /**
   * A string of the form 'vert-attachment horiz-attachment' or 'placement'
   * - placement can be "top", "bottom", "left", "right"
   * not yet supported:
   * - vert-attachment can be any of 'top', 'middle', 'bottom'
   * - horiz-attachment can be any of 'left', 'center', 'right'
   */
  attachment?: string;

  /** A string similar to `attachment`. The one difference is that, if it's not provided,
   * `targetAttachment` will assume the mirror image of `attachment`.
   */
  targetAttachment?: string;

  /** A string of the form 'vert-offset horiz-offset'
   * - vert-offset and horiz-offset can be of the form "20px" or "55%"
   */
  offset?: string;

  /** A string similar to `offset`, but referring to the offset of the target */
  targetOffset?: string;

  /** If true component will be attached to body */
  appendToBody?: boolean;
}

@Injectable()
export class PositioningService {
  position(options: PositioningOptions): void {
    const {element, target, attachment, appendToBody} = options;
    positionElements(
      _getHtmlElement(target),
      _getHtmlElement(element),
      attachment,
      appendToBody
    );
  }

}

function _getHtmlElement(element: HTMLElement | ElementRef | string): HTMLElement {
  // it means that we got a selector
  if (typeof element === 'string') {
    return document.querySelector(element) as HTMLElement;
  }

  if (element instanceof ElementRef) {
    return element.nativeElement;
  }

  return element as HTMLElement;
}
