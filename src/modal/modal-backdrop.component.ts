import { Component, ElementRef, OnInit, Renderer } from '@angular/core';

import { ClassName } from './modal-options.class';
import { isBs3 } from '../utils/theme-provider';
import { Utils } from '../utils/utils.class';

export class ModalBackdropOptions {
  animate = true;

  constructor(options: ModalBackdropOptions) {
    Object.assign(this, options);
  }
}

/** This component will be added as background layout for modals if enabled */
@Component({
  selector: 'bs-modal-backdrop',
  template: ' ',
  host: { class: ClassName.BACKDROP }
})
export class ModalBackdropComponent implements OnInit {
  get isAnimated(): boolean {
    return this._isAnimated;
  }

  set isAnimated(value: boolean) {
    this._isAnimated = value;
    // this.renderer.setElementClass(this.element.nativeElement, `${ClassName.FADE}`, value);
  }

  get isShown(): boolean {
    return this._isShown;
  }

  set isShown(value: boolean) {
    this._isShown = value;
    this.renderer.setElementClass(
      this.element.nativeElement,
      `${ClassName.IN}`,
      value
    );
    if (!isBs3()) {
      this.renderer.setElementClass(
        this.element.nativeElement,
        `${ClassName.SHOW}`,
        value
      );
    }
  }

  element: ElementRef;
  renderer: Renderer;

  protected _isAnimated: boolean;
  protected _isShown = false;

  constructor(element: ElementRef, renderer: Renderer) {
    this.element = element;
    this.renderer = renderer;
  }

  ngOnInit(): void {
    if (this.isAnimated) {
      this.renderer.setElementClass(
        this.element.nativeElement,
        `${ClassName.FADE}`,
        this.isAnimated
      );
      Utils.reflow(this.element.nativeElement);
    }
    this.isShown = true;
  }
}
