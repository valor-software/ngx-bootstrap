import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { CLASS_NAME } from './modal-options.class';
import { isBs3, Utils } from 'ngx-bootstrap/utils';


/** This component will be added as background layout for modals if enabled */
@Component({
  selector: 'bs-modal-backdrop',
  template: ' ',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { class: CLASS_NAME.BACKDROP }
})
export class ModalBackdropComponent implements OnInit {
  get isAnimated(): boolean {
    return this._isAnimated;
  }

  set isAnimated(value: boolean) {
    this._isAnimated = value;
  }

  get isShown(): boolean {
    return this._isShown;
  }

  set isShown(value: boolean) {
    this._isShown = value;
    if (value) {
      this.renderer.addClass(
        this.element.nativeElement,
        `${CLASS_NAME.IN}`
      );
    } else {
      this.renderer.removeClass(
        this.element.nativeElement,
        `${CLASS_NAME.IN}`
      );
    }
    if (!isBs3()) {
      if (value) {
        this.renderer.addClass(
          this.element.nativeElement,
          `${CLASS_NAME.SHOW}`
        );
      } else {
        this.renderer.removeClass(
          this.element.nativeElement,
          `${CLASS_NAME.SHOW}`
        );
      }
    }
  }

  element: ElementRef;
  renderer: Renderer2;

  protected _isAnimated = false;
  protected _isShown = false;

  constructor(element: ElementRef, renderer: Renderer2) {
    this.element = element;
    this.renderer = renderer;
  }

  ngOnInit(): void {
    if (this.isAnimated) {
      this.renderer.addClass(
        this.element.nativeElement,
        `${CLASS_NAME.FADE}`
      );
      Utils.reflow(this.element.nativeElement);
    }
    this.isShown = true;
  }
}
