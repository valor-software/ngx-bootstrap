import { ComponentRef, Injectable, TemplateRef } from '@angular/core';

import { ComponentLoader } from '../component-loader/component-loader.class';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalContainerComponent } from './modal-container.component';
import { BsModalRef, modalConfigDefaults, ModalOptions, TransitionDurations } from './modal-options.class';


@Injectable()
export class BsModalService {
  // constructor props
  public isAnimated = true;
  public config: ModalOptions = modalConfigDefaults;

  protected backdropRef: ComponentRef<ModalBackdropComponent>;

  private _backdropLoader: ComponentLoader<ModalBackdropComponent>;
  private _modalLoader: ComponentLoader<ModalContainerComponent>;
  private modalsCount: number = 0;
  private loaders: any[] = [];

  public constructor(private clf: ComponentLoaderFactory) {
    // this._createLoaders();
  }

  /** Shows a modal */
  show(content: string | TemplateRef<any> | any, config?: any): BsModalRef {
    this.modalsCount++;
    this._createLoaders();
    console.log(`Now ${this.modalsCount} modals`);
    this.config = Object.assign({}, modalConfigDefaults, config);

    this._showBackdrop();
    return this._showModal(content);
  }

  hide() {
    this.modalsCount--;
    console.log(`Now ${this.modalsCount} modals`);
    this._hideBackdrop();
    setTimeout(() => {
      this._hideModal();
      this.removeLoaders();
    }, TransitionDurations.BACKDROP);
  }

  _showBackdrop(): void {
    const isBackdropEnabled = this.config.backdrop || this.config.backdrop === 'static';
    const isBackdropInDOM = !this.backdropRef || !this.backdropRef.instance.isShown;

    if (this.modalsCount === 1) {
      this.removeBackdrop();

      if (isBackdropEnabled && isBackdropInDOM) {
        this._backdropLoader
          .attach(ModalBackdropComponent)
          .to('body')
          .show({isAnimated: this.isAnimated});
        this.backdropRef = this._backdropLoader._componentRef;
      }
    }
  }

  _hideBackdrop(): void {
    if (!this.backdropRef) {
      return;
    }
    this.backdropRef.instance.isShown = false;
    const duration = this.isAnimated ? TransitionDurations.BACKDROP : 0;
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
    modalContainerRef.instance.level = this.getModalsCount();
    bsModalRef.hide = () => {modalContainerRef.instance.hide();};
    bsModalRef.content = this._modalLoader.getInnerComponent() || null;
    return bsModalRef;
  }

  _hideModal(): void {
    if (this._modalLoader) {
      this._modalLoader.hide();
    }
  }

  getModalsCount(): number {
    return this.modalsCount;
  }

  protected removeBackdrop(): void {
    this._backdropLoader.hide();
    this.backdropRef = null;
  }

  private _createLoaders(): void {
    this.loaders.push({
      backdropLoader: this.clf.createLoader<ModalBackdropComponent>(null, null, null),
      modalLoader: this.clf.createLoader<ModalContainerComponent>(null, null, null)
    });
    console.log(this.loaders);
    this.setCurrentLoaders();
  }

  private removeLoaders(): void {
    this.loaders.pop();
    this.setCurrentLoaders();
    console.log(this.loaders);
  }

  private setCurrentLoaders(): void {
    if (this.loaders.length) {
      this._backdropLoader = this.loaders[this.loaders.length - 1].backdropLoader;
      this._modalLoader = this.loaders[this.loaders.length - 1].modalLoader;
      this.backdropRef = this._backdropLoader._componentRef;
    }
  }
}
