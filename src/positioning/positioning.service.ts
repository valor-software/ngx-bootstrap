import { Injectable, ElementRef, RendererFactory2 } from '@angular/core';

import { positionElements } from './ng-positioning';
import { fromEvent, merge, of, animationFrameScheduler, Subject } from 'rxjs';


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
  private update$$ = new Subject<null>();

  private events$: any = merge(
    fromEvent(window, 'scroll'),
    fromEvent(window, 'resize'),
    of(0, animationFrameScheduler),
    this.update$$
  );

  private positionElements = new Map();

  constructor(rendererFactory: RendererFactory2) {
    this.events$
      .subscribe(() => {
        this.positionElements
          .forEach((positionElement: PositioningOptions) => {
            positionElements(
              _getHtmlElement(positionElement.target),
              _getHtmlElement(positionElement.element),
              positionElement.attachment,
              positionElement.appendToBody,
              rendererFactory.createRenderer(null, null)
            );
          });
      });
  }

  position(options: PositioningOptions): void {
    this.addPositionElement(options);
    this.update$$.next();
  }

  addPositionElement(options: PositioningOptions): void {
    this.positionElements.set(_getHtmlElement(options.element), options);
  }

  deletePositionElement(elRef: ElementRef): void {
    this.positionElements.delete(_getHtmlElement(elRef));
  }
}

function _getHtmlElement(element: HTMLElement | ElementRef | string): HTMLElement {
  // it means that we got a selector
  if (typeof element === 'string') {
    return document.querySelector(element);
  }

  if (element instanceof ElementRef) {
    return element.nativeElement;
  }

  return element;
}
