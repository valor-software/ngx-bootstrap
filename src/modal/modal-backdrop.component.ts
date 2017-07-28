import { Component, ElementRef, OnInit, Renderer } from '@angular/core';

import { ClassName } from './modal-options.class';
import { isBs3 } from '../utils/ng2-bootstrap-config';
import { Utils } from '../utils/utils.class';

export class ModalBackdropOptions {
  public animate: boolean = true;

  public constructor(options: ModalBackdropOptions) {
    Object.assign(this, options);
  }
}

/** This component will be added as background layout for modals if enabled */
@Component({
  selector: 'bs-modal-backdrop',
  template: '',
  // tslint:disable-next-line
  host: {'class': ClassName.BACKDROP}
})
export class ModalBackdropComponent implements OnInit {
  public get isAnimated(): boolean {
    return this._isAnimated;
  }

  public set isAnimated(value: boolean) {
    this._isAnimated = value;
    // this.renderer.setElementClass(this.element.nativeElement, `${ClassName.FADE}`, value);
  }

  public get isShown(): boolean {
    return this._isShown;
  }

  public set isShown(value: boolean) {
    this._isShown = value;
    this.renderer.setElementClass(this.element.nativeElement, `${ClassName.IN}`, value);
    if (!isBs3()) {
      this.renderer.setElementClass(this.element.nativeElement, `${ClassName.SHOW}`, value);
    }
  }

  public element: ElementRef;
  public renderer: Renderer;

  protected _isAnimated: boolean;
  protected _isShown = false;

  public constructor(element: ElementRef, renderer: Renderer) {
    this.element = element;
    this.renderer = renderer;
  }

  ngOnInit(): void {
    if (this.isAnimated) {
      this.renderer.setElementClass(this.element.nativeElement, `${ClassName.FADE}`, this.isAnimated);
      Utils.reflow(this.element.nativeElement);
    }
    this.isShown = true;
  }
}
