import { ComponentRef, ElementRef, Injectable, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';

import { ComponentLoader } from '../component-loader/component-loader.class';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalContainerComponent } from './modal-container.component';
import { BsModalRef, modalConfigDefaults, ModalOptions } from './modal-options.class';

const BACKDROP_TRANSITION_DURATION = 150;

@Injectable()
export class BsModalService {
  // constructor props
  public isAnimated = true;
  public config: ModalOptions = modalConfigDefaults;

  protected backdropRef: ComponentRef<ModalBackdropComponent>;

  private _backdropLoader: ComponentLoader<ModalBackdropComponent>;
  private _modalLoader: ComponentLoader<ModalContainerComponent>;

  public constructor(private clf: ComponentLoaderFactory) {
    this._backdropLoader = this.clf.createLoader<ModalBackdropComponent>(null, null, null);
    this._modalLoader = this.clf.createLoader<ModalContainerComponent>(null, null, null);
  }

  /** Shows a modal */
  show(content: string | TemplateRef<any> | any, config?: any): BsModalRef {
    this.config = Object.assign({}, modalConfigDefaults, config);

    this._showBackdrop();
    return this._showModal(content);
  }

  hide() {
    this._hideBackdrop();
    setTimeout(() => this._hideModal(), BACKDROP_TRANSITION_DURATION);
  }

  _showBackdrop(): void {
    const isBackdropEnabled = this.config.backdrop || this.config.backdrop === 'static';
    const isBackdropInDOM = !this.backdropRef || !this.backdropRef.instance.isShown;

    this.removeBackdrop();

    if (isBackdropEnabled && isBackdropInDOM) {
      this._backdropLoader
        .attach(ModalBackdropComponent)
        .to('body')
        .show({isAnimated: this.isAnimated});
      this.backdropRef = this._backdropLoader._componentRef;
    }
  }

  _hideBackdrop(): void {
    if (!this.backdropRef) {
      return;
    }
    this.backdropRef.instance.isShown = false;
    const duration = this.isAnimated ? BACKDROP_TRANSITION_DURATION : 0;
    setTimeout(() => this.removeBackdrop(), duration);
  }

  _showModal(content: any): BsModalRef {
    const bsModalRef = new BsModalRef();
    const modalContainerRef = this._modalLoader
      .provide({provide: ModalOptions, useValue: this.config})
      .provide({provide: BsModalRef, useValue: bsModalRef})
      .attach(ModalContainerComponent)
      .to('body')
      .show({content});
    bsModalRef.hide = () => {modalContainerRef.instance.hide();};
    bsModalRef.content = this._modalLoader.getInnerComponent() || null;
    return bsModalRef;
  }

  _hideModal(): void {
    if (this._modalLoader) {
      this._modalLoader.hide();
    }
  }

  protected removeBackdrop(): void {
    this._backdropLoader.hide();
    this.backdropRef = null;
  }
}
