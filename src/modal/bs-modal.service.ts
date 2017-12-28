import {
  ComponentRef,
  Injectable,
  TemplateRef,
  EventEmitter, Renderer2, RendererFactory2
} from '@angular/core';

import { ComponentLoader } from '../component-loader/component-loader.class';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalContainerComponent } from './modal-container.component';
import {
  CLASS_NAME,
  modalConfigDefaults,
  ModalOptions,
  TRANSITION_DURATIONS
} from './modal-options.class';
import { BsModalRef } from './bs-modal-ref.service';
import { BsModalStore } from './bs-modal.store';

@Injectable()
export class BsModalService {
  // constructor props
  config: ModalOptions = modalConfigDefaults;
  onShow: EventEmitter<any> = new EventEmitter();
  onShown: EventEmitter<any> = new EventEmitter();
  onHide: EventEmitter<any> = new EventEmitter();
  onHidden: EventEmitter<any> = new EventEmitter();

  get modalsCount(): number {
    return this.store.modalsCount;
  }
  set modalsCount(count) {
    this.store.modalsCount = count;
  }

  get lastDismissReason(): any {
    return this.store.lastDismissReason;
  }
  set lastDismissReason(reason: any) {
    this.store.lastDismissReason = reason;
  }

  get loaders(): any {
    return this.store.loaders;
  }

  protected isBodyOverflowing = false;
  protected originalBodyPadding = 0;
  protected scrollbarWidth = 0;
  protected backdropRef: ComponentRef<ModalBackdropComponent>;

  private _backdropLoader: ComponentLoader<ModalBackdropComponent>;
  private _renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2, private clf: ComponentLoaderFactory, private store: BsModalStore) {
    this._backdropLoader = this.clf.createLoader<ModalBackdropComponent>(
      null,
      null,
      null
    );
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  /** Shows a modal */
  show(content: string | TemplateRef<any> | any, config?: any): BsModalRef {
    return this.build(Object.assign({}, modalConfigDefaults, config)).show(content);
  }

  build(config?: any): any {
    const loader = this._createLoaders();
    const localConfig = Object.assign({}, modalConfigDefaults, config);
    const bsModalRef = new BsModalRef(loader, localConfig);
    bsModalRef._modalService = this;
    this.copyEvent(loader.onBeforeShow, bsModalRef.onShow);
    this.copyEvent(loader.onShown, bsModalRef.onShown);
    this.copyEvent(loader.onBeforeHide, bsModalRef.onHide);
    this.copyEvent(loader.onHidden, bsModalRef.onHidden);

    return bsModalRef;
  }

  hide(level: number) {
    if (this.modalsCount === 1) {
      this._hideBackdrop();
      this.resetScrollbar();
    }
    this.modalsCount = this.modalsCount >= 1 ? this.modalsCount - 1 : 0;
    setTimeout(() => {
      this._hideModal(level);
      this.store.removeLoaders(level);
    }, this.config.animated ? TRANSITION_DURATIONS.BACKDROP : 0);
  }

  _showBackdrop(): void {
    const isBackdropEnabled =
      this.config.backdrop || this.config.backdrop === 'static';
    const isBackdropInDOM =
      !this.backdropRef || !this.backdropRef.instance.isShown;

    if (this.modalsCount === 1) {
      this.removeBackdrop();

      if (isBackdropEnabled && isBackdropInDOM) {
        this._backdropLoader
          .attach(ModalBackdropComponent)
          .to('body')
          .show({ isAnimated: this.config.animated });
        this.backdropRef = this._backdropLoader._componentRef;
      }
    }
  }

  _hideBackdrop(): void {
    if (!this.backdropRef) {
      return;
    }
    this.backdropRef.instance.isShown = false;
    const duration = this.config.animated ? TRANSITION_DURATIONS.BACKDROP : 0;
    setTimeout(() => this.removeBackdrop(), duration);
  }

  _hideModal(level: number): void {
    const modalLoader = this.loaders[level - 1];
    if (modalLoader) {
      modalLoader.hide();
    }
  }

  getModalsCount(): number {
    return this.modalsCount;
  }

  setDismissReason(reason: any): void {
    this.lastDismissReason = reason;
  }

  removeBackdrop(): void {
    this._backdropLoader.hide();
    this.backdropRef = null;
  }

  /** AFTER PR MERGE MODAL.COMPONENT WILL BE USING THIS CODE */
  /** Scroll bar tricks */
  /** @internal */
  checkScrollbar(): void {
    this.isBodyOverflowing = document.body.clientWidth < window.innerWidth;
    this.scrollbarWidth = this.getScrollbarWidth();
  }

  setScrollbar(): void {
    if (!document) {
      return;
    }

    this.originalBodyPadding = parseInt(
      window
        .getComputedStyle(document.body)
        .getPropertyValue('padding-right') || '0',
      10
    );

    if (this.isBodyOverflowing) {
      document.body.style.paddingRight = `${this.originalBodyPadding +
        this.scrollbarWidth}px`;
    }
  }

  private resetScrollbar(): void {
    document.body.style.paddingRight = `${this.originalBodyPadding}px`;
  }

  // thx d.walsh
  private getScrollbarWidth(): number {
    const scrollDiv = this._renderer.createElement('div');
    this._renderer.addClass(scrollDiv, CLASS_NAME.SCROLLBAR_MEASURER);
    this._renderer.appendChild(document.body, scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this._renderer.removeChild(document.body, scrollDiv);

    return scrollbarWidth;
  }

  private _createLoaders(): ComponentLoader<ModalContainerComponent> {
    const loader = this.clf.createLoader<ModalContainerComponent>(
      null,
      null,
      null
    );
    this.copyEvent(loader.onBeforeShow, this.onShow);
    this.copyEvent(loader.onShown, this.onShown);
    this.copyEvent(loader.onBeforeHide, this.onHide);
    this.copyEvent(loader.onHidden, this.onHidden);

    return loader;
  }

  private copyEvent(from: EventEmitter<any>, to: EventEmitter<any>) {
    from.subscribe(() => {
      to.emit(this.lastDismissReason);
    });
  }
}
