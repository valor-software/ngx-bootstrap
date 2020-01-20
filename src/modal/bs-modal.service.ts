import {
  ComponentRef,
  Injectable,
  TemplateRef,
  EventEmitter,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalContainerComponent } from './modal-container.component';
import {
  CLASS_NAME,
  modalConfigDefaults,
  ModalOptions,
  TRANSITION_DURATIONS
} from './modal-options.class';
import { BsModalRef } from './bs-modal-ref.service';

@Injectable()
export class BsModalService {
  // constructor props
  config: ModalOptions = modalConfigDefaults;

  // tslint:disable-next-line:no-any
  onShow: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-any
  onShown: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-any
  onHide: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-any
  onHidden: EventEmitter<any> = new EventEmitter();

  protected isBodyOverflowing = false;
  protected originalBodyPadding = 0;

  protected scrollbarWidth = 0;

  protected backdropRef: ComponentRef<ModalBackdropComponent>;
  private _backdropLoader: ComponentLoader<ModalBackdropComponent>;
  private modalsCount = 0;
  private lastDismissReason = '';

  private loaders: ComponentLoader<ModalContainerComponent>[] = [];

  private _renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2, private clf: ComponentLoaderFactory) {
    this._backdropLoader = this.clf.createLoader<ModalBackdropComponent>(
      null,
      null,
      null
    );
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  /** Shows a modal */
  // tslint:disable-next-line:no-any
  show(content: string | TemplateRef<any> | any, config?: ModalOptions): BsModalRef {
    this.modalsCount++;
    this._createLoaders();
    this.config = Object.assign({}, modalConfigDefaults, config);
    this._showBackdrop();
    this.lastDismissReason = null;

    return this._showModal(content);
  }

  hide(level: number) {
    if (this.modalsCount === 1) {
      this._hideBackdrop();
      this.resetScrollbar();
    }
    this.modalsCount = this.modalsCount >= 1 ? this.modalsCount - 1 : 0;
    setTimeout(() => {
      this._hideModal(level);
      this.removeLoaders(level);
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
  // tslint:disable-next-line:no-any
  _showModal(content: any): BsModalRef {
    const modalLoader = this.loaders[this.loaders.length - 1];
    const bsModalRef = new BsModalRef();
    const modalContainerRef = modalLoader
      .provide({ provide: ModalOptions, useValue: this.config })
      .provide({ provide: BsModalRef, useValue: bsModalRef })
      .attach(ModalContainerComponent)
      .to('body')
      .show({content, isAnimated: this.config.animated, initialState: this.config.initialState, bsModalService: this});
    modalContainerRef.instance.level = this.getModalsCount();
    bsModalRef.result = new Promise((resolve, reject) => {
      // tslint:disable-next-line:no-any
      bsModalRef.hide = (arg?: any) => {
        modalContainerRef.instance.hide();
        resolve(arg);
      };
      // tslint:disable-next-line:no-any
      bsModalRef.dismiss = (arg?: any) => {
        modalContainerRef.instance.hide();
        reject(arg);
      };
    });
    bsModalRef.content = modalLoader.getInnerComponent() || null;
    bsModalRef.setClass = (newClass: string) => {
      modalContainerRef.instance.config.class = newClass;
    };

    return bsModalRef;
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

  setDismissReason(reason: string) {
    this.lastDismissReason = reason;
  }

  removeBackdrop(): void {
    this._backdropLoader.hide();
    this.backdropRef = null;
  }

  /** Checks if the body is overflowing and sets scrollbar width */
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

  private _createLoaders(): void {
    const loader = this.clf.createLoader<ModalContainerComponent>(
      null,
      null,
      null
    );
    this.copyEvent(loader.onBeforeShow, this.onShow);
    this.copyEvent(loader.onShown, this.onShown);
    this.copyEvent(loader.onBeforeHide, this.onHide);
    this.copyEvent(loader.onHidden, this.onHidden);
    this.loaders.push(loader);
  }

  private removeLoaders(level: number): void {
    this.loaders.splice(level - 1, 1);
    this.loaders.forEach(
      (loader: ComponentLoader<ModalContainerComponent>, i: number) => {
        loader.instance.level = i + 1;
      }
    );
  }

  // tslint:disable-next-line:no-any
  private copyEvent(from: EventEmitter<any>, to: EventEmitter<any>) {
    from.subscribe(() => {
      to.emit(this.lastDismissReason);
    });
  }
}
