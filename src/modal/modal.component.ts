/* tslint:disable:max-file-line-count */
// todo: should we support enforce focus in?
// todo: in original bs there are was a way to prevent modal from showing
// todo: original modal had resize events

import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  Renderer, ViewContainerRef
} from '@angular/core';

import { document } from  '../utils/facade/browser';

import { isBs3 } from '../utils/theme-provider';
import { Utils } from '../utils/utils.class';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ClassName, modalConfigDefaults, ModalOptions, Selector, DISMISS_REASONS } from './modal-options.class';

import { window } from '../utils/facade/browser';
import { ComponentLoader } from '../component-loader/component-loader.class';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

/** Mark any code with directive to show it's content in modal */
@Directive({
  selector: '[bsModal]',
  exportAs: 'bs-modal'
})
export class ModalDirective implements AfterViewInit, OnDestroy {
  /** allows to set modal configuration via element property */
  @Input()
  public set config(conf: ModalOptions) {
    this._config = this.getConfig(conf);
  }

  public get config(): ModalOptions {
    return this._config;
  }

  /** This event fires immediately when the `show` instance method is called. */
  @Output() public onShow: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  /** This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete) */
  @Output() public onShown: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  /** This event is fired immediately when the hide instance method has been called. */
  @Output() public onHide: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  /** This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete). */
  @Output() public onHidden: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();

  // seems like an Options
  public isAnimated: boolean = true;
  /** This field contains last dismiss reason. Possible values: `backdrop-click`, `esc` and `null` (if modal was closed by direct call of `.hide()`). */
  public dismissReason: string;

  public get isShown(): boolean {
    return this._isShown;
  }

  protected _config: ModalOptions;
  protected _isShown: boolean = false;

  protected isBodyOverflowing: boolean = false;
  protected originalBodyPadding: number = 0;
  protected scrollbarWidth: number = 0;

  protected timerHideModal: any = 0;
  protected timerRmBackDrop: any = 0;

  // constructor props
  protected _element: ElementRef;
  protected _renderer: Renderer;

  // reference to backdrop component
  protected backdrop: ComponentRef<ModalBackdropComponent>;
  private _backdrop: ComponentLoader<ModalBackdropComponent>;
  // todo: implement _dialog
  private _dialog: any;

  private isNested: boolean = false;

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    if (this.config.ignoreBackdropClick || this.config.backdrop === 'static' || event.target !== this._element.nativeElement) {
      return;
    }
    this.dismissReason = DISMISS_REASONS.BACKRDOP;
    this.hide(event);
  }

  // todo: consider preventing default and stopping propagation
  @HostListener('keydown.esc')
  public onEsc(): void {
    if (this.config.keyboard) {
      this.dismissReason = DISMISS_REASONS.ESC;
      this.hide();
    }
  }

  public constructor(_element: ElementRef, _viewContainerRef: ViewContainerRef, _renderer: Renderer, clf: ComponentLoaderFactory) {
    this._element = _element;
    this._renderer = _renderer;
    this._backdrop = clf.createLoader<ModalBackdropComponent>(_element, _viewContainerRef, _renderer);
  }

  public ngOnDestroy(): any {
    this.config = void 0;
    if (this._isShown) {
      this._isShown = false;
      this.hideModal();
      this._backdrop.dispose();
    }
  }

  public ngAfterViewInit(): any {
    this._config = this._config || this.getConfig();
    setTimeout(() => {
      if (this._config.show) {
        this.show();
      }
    }, 0);
  }

  /* Public methods */

  /** Allows to manually toggle modal visibility */
  public toggle(): void {
    return this._isShown ? this.hide() : this.show();
  }

  /** Allows to manually open modal */
  public show(): void {
    this.dismissReason = null;
    this.onShow.emit(this);
    if (this._isShown) {
      return;
    }
    clearTimeout(this.timerHideModal);
    clearTimeout(this.timerRmBackDrop);

    this._isShown = true;

    this.checkScrollbar();
    this.setScrollbar();

    if (document && document.body) {
      if (document.body.classList.contains(ClassName.OPEN)) {
        this.isNested = true;
      } else {
        this._renderer.setElementClass(document.body, ClassName.OPEN, true);
      }
    }

    this.showBackdrop(() => {
      this.showElement();
    });
  }

  /** Allows to manually close modal */
  public hide(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    this.onHide.emit(this);

    // todo: add an option to prevent hiding
    if (!this._isShown) {
      return;
    }

    clearTimeout(this.timerHideModal);
    clearTimeout(this.timerRmBackDrop);

    this._isShown = false;
    this._renderer.setElementClass(this._element.nativeElement, ClassName.IN, false);
    if (!isBs3()) {
      this._renderer.setElementClass(this._element.nativeElement, ClassName.SHOW, false);
    }
    // this._addClassIn = false;

    if (this.isAnimated) {
      this.timerHideModal = setTimeout(() => this.hideModal(), TRANSITION_DURATION);
    } else {
      this.hideModal();
    }
  }

  /** Private methods @internal */
  protected getConfig(config?: ModalOptions): ModalOptions {
    return Object.assign({}, modalConfigDefaults, config);
  }

  /**
   *  Show dialog
   *  @internal
   */
  protected showElement(): void {
    // todo: replace this with component loader usage
    if (!this._element.nativeElement.parentNode ||
      (this._element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE)) {
      // don't move modals dom position
      if (document && document.body) {
        document.body.appendChild(this._element.nativeElement);
      }
    }

    this._renderer.setElementAttribute(this._element.nativeElement, 'aria-hidden', 'false');
    this._renderer.setElementStyle(this._element.nativeElement, 'display', 'block');
    this._renderer.setElementProperty(this._element.nativeElement, 'scrollTop', 0);

    if (this.isAnimated) {
      Utils.reflow(this._element.nativeElement);
    }

    // this._addClassIn = true;
    this._renderer.setElementClass(this._element.nativeElement, ClassName.IN, true);
    if (!isBs3()) {
      this._renderer.setElementClass(this._element.nativeElement, ClassName.SHOW, true);
    }

    const transitionComplete = () => {
      if (this._config.focus) {
        this._element.nativeElement.focus();
      }
      this.onShown.emit(this);
    };

    if (this.isAnimated) {
      setTimeout(transitionComplete, TRANSITION_DURATION);
    } else {
      transitionComplete();
    }
  }

  /** @internal */
  protected hideModal(): void {
    this._renderer.setElementAttribute(this._element.nativeElement, 'aria-hidden', 'true');
    this._renderer.setElementStyle(this._element.nativeElement, 'display', 'none');
    this.showBackdrop(() => {
      if (!this.isNested) {
        if (document && document.body) {
          this._renderer.setElementClass(document.body, ClassName.OPEN, false);
        }
        this.resetScrollbar();
      }
      this.resetAdjustments();
      this.focusOtherModal();
      this.onHidden.emit(this);
    });
  }

  // todo: original show was calling a callback when done, but we can use promise
  /** @internal */
  protected showBackdrop(callback?: Function): void {
    if (this._isShown && this.config.backdrop && (!this.backdrop || !this.backdrop.instance.isShown)) {
      this.removeBackdrop();
      this._backdrop
        .attach(ModalBackdropComponent)
        .to('body')
        .show({isAnimated: this.isAnimated});
      this.backdrop = this._backdrop._componentRef;

      if (!callback) {
        return;
      }

      if (!this.isAnimated) {
        callback();
        return;
      }

      setTimeout(callback, BACKDROP_TRANSITION_DURATION);
    } else if (!this._isShown && this.backdrop) {
      this.backdrop.instance.isShown = false;

      let callbackRemove = () => {
        this.removeBackdrop();
        if (callback) {
          callback();
        }
      };

      if (this.backdrop.instance.isAnimated) {
        this.timerRmBackDrop = setTimeout(callbackRemove, BACKDROP_TRANSITION_DURATION);
      } else {
        callbackRemove();
      }
    } else if (callback) {
      callback();
    }
  }

  /** @internal */
  protected removeBackdrop(): void {
    this._backdrop.hide();
  }

  /** Events tricks */

  // no need for it
  // protected setEscapeEvent():void {
  //   if (this._isShown && this._config.keyboard) {
  //     $(this._element).on(Event.KEYDOWN_DISMISS, (event) => {
  //       if (event.which === 27) {
  //         this.hide()
  //       }
  //     })
  //
  //   } else if (!this._isShown) {
  //     $(this._element).off(Event.KEYDOWN_DISMISS)
  //   }
  // }

  // protected setResizeEvent():void {
  // console.log(this.renderer.listenGlobal('', Event.RESIZE));
  // if (this._isShown) {
  //   $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this))
  // } else {
  //   $(window).off(Event.RESIZE)
  // }
  // }

  protected focusOtherModal() {
    const otherOpenedModals = this._element.nativeElement.parentElement.querySelectorAll('.in[bsModal]');
    if (!otherOpenedModals.length) {
      return;
    }
    this._renderer.invokeElementMethod(otherOpenedModals[otherOpenedModals.length - 1], 'focus');
  }

  /** @internal */
  protected resetAdjustments(): void {
    this._renderer.setElementStyle(this._element.nativeElement, 'paddingLeft', '');
    this._renderer.setElementStyle(this._element.nativeElement, 'paddingRight', '');
  }

  /** Scroll bar tricks */
  /** @internal */
  protected checkScrollbar(): void {
    this.isBodyOverflowing = document.body.clientWidth < window.innerWidth;
    this.scrollbarWidth = this.getScrollbarWidth();
  }

  protected setScrollbar(): void {
    if (!document) {
      return;
    }

    this.originalBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right') || 0, 10);

    if (this.isBodyOverflowing) {
      document.body.style.paddingRight = `${this.originalBodyPadding + this.scrollbarWidth}px`;
    }
  }

  protected resetScrollbar(): void {
    document.body.style.paddingRight = this.originalBodyPadding;
  }

  // thx d.walsh
  protected getScrollbarWidth(): number {
    const scrollDiv = this._renderer.createElement(document.body, 'div', void 0);
    scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }
}
