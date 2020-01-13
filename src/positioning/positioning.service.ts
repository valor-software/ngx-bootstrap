import { Injectable, ElementRef, RendererFactory2, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { positionElements } from './ng-positioning';

import { fromEvent, merge, of, animationFrameScheduler, Subject, Observable } from 'rxjs';
import { Options } from './models';


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
  private options: Options;
  private update$$ = new Subject<null>();
  private positionElements = new Map();
  private triggerEvent$: Observable<number|Event>;
  private isDisabled = false;

  constructor(
    ngZone: NgZone,
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) platformId: number
  ) {

    if (isPlatformBrowser(platformId)) {
      ngZone.runOutsideAngular(() => {
        this.triggerEvent$ = merge(
          fromEvent(window, 'scroll', { passive: true }),
          fromEvent(window, 'resize', { passive: true }),
          /* tslint:disable-next-line: deprecation */
          of(0, animationFrameScheduler),
          this.update$$
        );

        this.triggerEvent$.subscribe(() => {
          if (this.isDisabled) {
            return;
          }

          this.positionElements
          /* tslint:disable-next-line: no-any */
            .forEach((positionElement: any) => {
              positionElements(
                _getHtmlElement(positionElement.target),
                _getHtmlElement(positionElement.element),
                positionElement.attachment,
                positionElement.appendToBody,
                this.options,
                rendererFactory.createRenderer(null, null)
              );
            });
        });
      });
    }
  }

  position(options: PositioningOptions): void {
    this.addPositionElement(options);
  }

  get event$(): Observable<number|Event> {
    return this.triggerEvent$;
  }

  disable(): void {
    this.isDisabled = true;
  }

  enable(): void {
    this.isDisabled = false;
  }

  addPositionElement(options: PositioningOptions): void {
    this.positionElements.set(_getHtmlElement(options.element), options);
  }

  calcPosition(): void {
    this.update$$.next();
  }

  deletePositionElement(elRef: ElementRef): void {
    this.positionElements.delete(_getHtmlElement(elRef));
  }

  setOptions(options: Options) {
    this.options = options;
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
