import { ComponentRef, ElementRef, Injectable, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';

import { ComponentLoader } from '../component-loader/component-loader.class';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { Utils } from '../utils/utils.class';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalContainerComponent } from './modal-container.component';
import { BsModalRef, modalConfigDefaults, ModalOptions } from './modal-options.class';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

@Injectable()
export class BsModalService {
  // constructor props
  public isAnimated: boolean = true;
  public config: ModalOptions = modalConfigDefaults;
  protected _isShown: boolean = false;
  protected timerRmBackDrop: number = 0;
  protected backdropRef: ComponentRef<ModalBackdropComponent>;
  private _backdrop: ComponentLoader<ModalBackdropComponent>;
  private _modal: ComponentLoader<ModalContainerComponent>;

  public constructor(private clf: ComponentLoaderFactory) {}

  /** Initialization of BsModalService, requires ElementRef, ViewContainerRef and Renderer instances */
  public create(_element: ElementRef, _viewContainerRef: ViewContainerRef, _renderer: Renderer) {
    this._backdrop = this.clf.createLoader<ModalBackdropComponent>(_element, _viewContainerRef, _renderer);
    this._modal = this.clf
      .createLoader<ModalContainerComponent>(_element, _viewContainerRef, _renderer);
    return this;
  }

  /** Shows a modal */
  public show(content: string | TemplateRef<any> | any, config: any = {}): BsModalRef {
    this.config = Object.assign({}, modalConfigDefaults, config);
    clearTimeout(this.timerRmBackDrop);
    this._isShown = true;
    this.toggleBackdrop();
    const bsModalRef = new BsModalRef();
    const modalContainerRef = this._modal
      .provide({provide: ModalOptions, useValue: this.config})
      .provide({provide: BsModalRef, useValue: bsModalRef})
      .attach(ModalContainerComponent)
      .show({content});
    bsModalRef.hide = () => {modalContainerRef.instance.hide();};
    bsModalRef.content = this._modal.getInnerComponent() || null;
    return bsModalRef;
  }

  public hide() {
    this._isShown = false;
    if (this.backdropRef && this.backdropRef.instance) {
      this.backdropRef.instance.isShown = false;
    }
    setTimeout(() => {
      this.removeBackdrop();
      if (this._modal) {
        this._modal.hide();
      }
      this.backdropRef = null;
    }, BACKDROP_TRANSITION_DURATION);
  }

  /** @internal */
  protected toggleBackdrop(): void {
    // this if will not happen
    if (!this._isShown && this.backdropRef) {
      return this._hideBackdrop();
    }

    const isBackdropEnabled = this.config.backdrop || this.config.backdrop === 'static';
    const isBackdropInDOM = !this.backdropRef || !this.backdropRef.instance.isShown;
    if (this._isShown && isBackdropEnabled && isBackdropInDOM) {
      return this._showBackdrop();
    }
  }

  _showBackdrop(): void {
    this.removeBackdrop();
    this._backdrop
      .attach(ModalBackdropComponent)
      .to('body')
      // .show({isAnimated: false});
      .show({isAnimated: this.isAnimated});
    this.backdropRef = this._backdrop._componentRef;

    // if (this.isAnimated) {
    //   this.backdropRef.instance.isAnimated = this.isAnimated;
    //   Utils.reflow(this.backdropRef.instance.element.nativeElement);
    // }
    //
    // this.backdropRef.instance.isShown = true;
  }

  _hideBackdrop(): void {
    this.backdropRef.instance.isShown = false;
    const duration = this.backdropRef.instance.isAnimated ? BACKDROP_TRANSITION_DURATION: 0;
    this.timerRmBackDrop = setTimeout(() => this.removeBackdrop(), duration);
  }

  protected removeBackdrop(): void {
    this._backdrop.hide();
  }
}
