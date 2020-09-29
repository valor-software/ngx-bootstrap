import {
  ComponentRef,
  Injectable,
  TemplateRef,
  EventEmitter,
  Renderer2,
  RendererFactory2,
  Inject,
  Optional
} from '@angular/core';

import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalContainerComponent } from './modal-container.component';
import {
  CLASS_NAME,
  modalConfigDefaults,
  ModalOptions,
  TRANSITION_DURATIONS,
  MODAL_CONFIG_DEFAULT_OVERRIDE
} from './modal-options.class';
import { BsModalRef } from './bs-modal-ref.service';

@Injectable()
export class BsModalService {
  // constructor props
  config: ModalOptions;

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
  private lastDismissReason: any = null;

  private loaders: ComponentLoader<ModalContainerComponent>[] = [];

  private _renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    private clf: ComponentLoaderFactory,
    @Optional() @Inject(MODAL_CONFIG_DEFAULT_OVERRIDE) private modalDefaultOption: ModalOptions) {
    this._backdropLoader = this.clf.createLoader<ModalBackdropComponent>(
      null,
      null,
      null
    );
    this._renderer = rendererFactory.createRenderer(null, null);
    this.config = modalDefaultOption ?
      (Object.assign({}, modalConfigDefaults, modalDefaultOption)) :
      modalConfigDefaults;
  }

  /** Shows a modal */
  show<T = Object>(
    // tslint:disable-next-line:no-any
    content: string | TemplateRef<any> | { new(...args: any[]): T },
    config?: ModalOptions<T>
  ): BsModalRef<T> {
    this.modalsCount++;
    this._createLoaders();

    const id = config?.id || (new Date()).getUTCMilliseconds(); // must be different per every show() call
    this.config = this.modalDefaultOption ?
      Object.assign({}, modalConfigDefaults, this.modalDefaultOption, config) :
      Object.assign({}, modalConfigDefaults, config);
    this.config.id = id;

    this._showBackdrop();
    this.lastDismissReason = null;

    return this._showModal(content);
  }

  hide(id?: number) {
    if (this.modalsCount === 1 || id == null) {
      this._hideBackdrop();
      this.resetScrollbar();
    }
    this.modalsCount = this.modalsCount >= 1 && id != null ? this.modalsCount - 1 : 0;
    setTimeout(() => {
      this._hideModal(id);
      this.removeLoaders(id);
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
    if (this.config && this.config.providers) {
      for (const provider of this.config.providers) {
        modalLoader.provide(provider);
      }
    }

    const bsModalRef = new BsModalRef();
    const modalContainerRef = modalLoader
      .provide({ provide: ModalOptions, useValue: this.config })
      .provide({ provide: BsModalRef, useValue: bsModalRef })
      .attach(ModalContainerComponent)
      .to('body');
    bsModalRef.hide = () => modalContainerRef.instance.hide();
    bsModalRef.setClass = (newClass: string) => {
      modalContainerRef.instance.config.class = newClass;
    };

    bsModalRef.onHidden = new EventEmitter<any>();
    bsModalRef.onHide = new EventEmitter<any>();

    this.copyEvent(modalLoader.onBeforeHide, bsModalRef.onHide);
    this.copyEvent(modalLoader.onHidden, bsModalRef.onHidden);
    // call 'show' method after assign setClass in bsModalRef.
    // it makes modal component's bsModalRef available to call setClass method
    modalContainerRef.show({
      content,
      isAnimated: this.config.animated,
      initialState: this.config.initialState,
      bsModalService: this,
      id: this.config.id
    });
    modalContainerRef.instance.level = this.getModalsCount();

    bsModalRef.content = modalLoader.getInnerComponent() || null;
    bsModalRef.id = modalContainerRef.instance.config?.id;

    return bsModalRef;
  }

  _hideModal(id?: number): void {
    if (id != null) {
      const indexToRemove = this.loaders.findIndex(loader => loader.instance.config.id === id);
      const modalLoader = this.loaders[indexToRemove];
      if (modalLoader) {
        modalLoader.hide(id);
      }
    } else {
      this.loaders.forEach(
        (loader: ComponentLoader<ModalContainerComponent>) => {
          loader.hide(loader.instance.config.id);
        }
      );
    }
  }

  getModalsCount(): number {
    return this.modalsCount;
  }

  setDismissReason(reason: string) {
    this.lastDismissReason = reason;
  }

  removeBackdrop(): void {
    this._renderer.removeClass(document.body, CLASS_NAME.OPEN);
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

  private removeLoaders(id?: number): void {
    if (id != null) {
      const indexToRemove = this.loaders.findIndex(loader => loader.instance.config.id === id);
      if (indexToRemove >= 0) {
        this.loaders.splice(indexToRemove, 1);
        this.loaders.forEach(
          (loader: ComponentLoader<ModalContainerComponent>, i: number) => {
            loader.instance.level = i + 1;
          }
        );
      }
    } else {
      this.loaders.splice(0, this.loaders.length);
    }
  }

  // tslint:disable-next-line:no-any
  private copyEvent(from: EventEmitter<any>, to: EventEmitter<any>) {
    from.subscribe((data: any) => {
      to.emit(this.lastDismissReason || data);
    });
  }
}
