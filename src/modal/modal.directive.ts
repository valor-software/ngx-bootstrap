/* tslint:disable:max-file-line-count */
// todo: should we support enforce focus in?
// todo: in original bs there are was a way to prevent modal from showing
// todo: original modal had resize events

import {
  ComponentRef, Directive, ElementRef, EventEmitter, HostListener, Input,
  OnDestroy, OnInit, Output, Renderer2, ViewContainerRef
} from '@angular/core';

import { document, window } from '../utils/facade/browser';

import { isBs3 } from '../utils/theme-provider';
import { Utils } from '../utils/utils.class';
import { ModalBackdropComponent } from './modal-backdrop.component';
import {
  CLASS_NAME, DISMISS_REASONS, modalConfigDefaults, ModalOptions
} from './modal-options.class';
import { ComponentLoader } from '../component-loader/component-loader.class';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

/** Mark any code with directive to show it's content in modal */
@Directive({
  selector: '[bsModal]',
  exportAs: 'bs-modal'
})
export class ModalDirective implements OnDestroy, OnInit {
  /** allows to set modal configuration via element property */
  @Input()
  set config(conf: ModalOptions) {
    this._config = this.getConfig(conf);
  }

  get config(): ModalOptions {
    return this._config;
  }

  /** This event fires immediately when the `show` instance method is called. */
  @Output()
  onShow: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  /** This event is fired when the modal has been made visible to the user
   * (will wait for CSS transitions to complete)
   */
  @Output()
  onShown: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  /** This event is fired immediately when
   * the hide instance method has been called.
   */
  @Output()
  onHide: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  /** This event is fired when the modal has finished being
   * hidden from the user (will wait for CSS transitions to complete).
   */
  @Output()
  onHidden: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();

  /** This field contains last dismiss reason.
   * Possible values: `backdrop-click`, `esc` and `null`
   * (if modal was closed by direct call of `.hide()`).
   */
  dismissReason: string;

  get isShown(): boolean {
    return this._isShown;
  }

  protected _config: ModalOptions;
  protected _isShown = false;

  protected isBodyOverflowing = false;
  protected originalBodyPadding = 0;
  protected scrollbarWidth = 0;

  protected timerHideModal: any = 0;
  protected timerRmBackDrop: any = 0;

  // reference to backdrop component
  protected backdrop: ComponentRef<ModalBackdropComponent>;
  private _backdrop: ComponentLoader<ModalBackdropComponent>;

  private isNested = false;

  constructor(private _element: ElementRef,
              _viewContainerRef: ViewContainerRef,
              private _renderer: Renderer2,
              clf: ComponentLoaderFactory) {
    this._backdrop = clf.createLoader<ModalBackdropComponent>(
      _element,
      _viewContainerRef,
      _renderer
    );
  }

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    if (
      this.config.ignoreBackdropClick ||
      this.config.backdrop === 'static' ||
      event.target !== this._element.nativeElement
    ) {
      return;
    }
    this.dismissReason = DISMISS_REASONS.BACKRDOP;
    this.hide(event);
  }

  // todo: consider preventing default and stopping propagation
  @HostListener('keydown.esc', ['$event'])
  onEsc(event: any): void {
    if (!this._isShown) {
      return;
    }

    if (event.keyCode === 27) {
      event.preventDefault();
    }

    if (this.config.keyboard) {
      this.dismissReason = DISMISS_REASONS.ESC;
      this.hide();
    }
  }

  ngOnDestroy(): any {
    this.config = void 0;
    if (this._isShown) {
      this._isShown = false;
      this.hideModal();
      this._backdrop.dispose();
    }
  }

  ngOnInit(): any {
    this._config = this._config || this.getConfig();
    setTimeout(() => {
      if (this._config.show) {
        this.show();
      }
    }, 0);
  }

  /* Public methods */

  /** Allows to manually toggle modal visibility */
  toggle(): void {
    return this._isShown ? this.hide() : this.show();
  }

  /** Allows to manually open modal */
  show(): void {
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
      if (document.body.classList.contains(CLASS_NAME.OPEN)) {
        this.isNested = true;
      } else {
        this._renderer.addClass(document.body, CLASS_NAME.OPEN);
      }
    }

    this.showBackdrop(() => {
      this.showElement();
    });
  }

  /** Allows to manually close modal */
  hide(event?: Event): void {
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
    this._renderer.removeClass(this._element.nativeElement, CLASS_NAME.IN);
    if (!isBs3()) {
      this._renderer.removeClass(this._element.nativeElement, CLASS_NAME.SHOW);
    }
    // this._addClassIn = false;

    if (this._config.animated) {
      this.timerHideModal = setTimeout(
        () => this.hideModal(),
        TRANSITION_DURATION
      );
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
    if (
      !this._element.nativeElement.parentNode ||
      this._element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE
    ) {
      // don't move modals dom position
      if (document && document.body) {
        document.body.appendChild(this._element.nativeElement);
      }
    }

    this._renderer.setAttribute(
      this._element.nativeElement,
      'aria-hidden',
      'false'
    );
    this._renderer.setAttribute(
      this._element.nativeElement,
      'aria-modal',
      'true'
    );
    this._renderer.setStyle(
      this._element.nativeElement,
      'display',
      'block'
    );
    this._renderer.setProperty(
      this._element.nativeElement,
      'scrollTop',
      0
    );

    if (this._config.animated) {
      Utils.reflow(this._element.nativeElement);
    }

    // this._addClassIn = true;
    this._renderer.addClass(this._element.nativeElement, CLASS_NAME.IN);
    if (!isBs3()) {
      this._renderer.addClass(this._element.nativeElement, CLASS_NAME.SHOW);
    }

    const transitionComplete = () => {
      if (this._config.focus) {
        this._element.nativeElement.focus();
      }
      this.onShown.emit(this);
    };

    if (this._config.animated) {
      setTimeout(transitionComplete, TRANSITION_DURATION);
    } else {
      transitionComplete();
    }
  }

  /** @internal */
  protected hideModal(): void {
    this._renderer.setAttribute(
      this._element.nativeElement,
      'aria-hidden',
      'true'
    );
    this._renderer.setStyle(
      this._element.nativeElement,
      'display',
      'none'
    );
    this.showBackdrop(() => {
      if (!this.isNested) {
        if (document && document.body) {
          this._renderer.removeClass(document.body, CLASS_NAME.OPEN);
        }
        this.resetScrollbar();
      }
      this.resetAdjustments();
      this.focusOtherModal();
      this.onHidden.emit(this);
    });
  }

  // todo: original show was calling a callback when done, but we can use
  // promise
  /** @internal */
  protected showBackdrop(callback?: Function): void {
    if (
      this._isShown &&
      this.config.backdrop &&
      (!this.backdrop || !this.backdrop.instance.isShown)
    ) {
      this.removeBackdrop();
      this._backdrop
        .attach(ModalBackdropComponent)
        .to('body')
        .show({isAnimated: this._config.animated});
      this.backdrop = this._backdrop._componentRef;

      if (!callback) {
        return;
      }

      if (!this._config.animated) {
        callback();

        return;
      }

      setTimeout(callback, BACKDROP_TRANSITION_DURATION);
    } else if (!this._isShown && this.backdrop) {
      this.backdrop.instance.isShown = false;

      const callbackRemove = () => {
        this.removeBackdrop();
        if (callback) {
          callback();
        }
      };

      if (this.backdrop.instance.isAnimated) {
        this.timerRmBackDrop = setTimeout(
          callbackRemove,
          BACKDROP_TRANSITION_DURATION
        );
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
    if (this._element.nativeElement.parentElement == null) return;
    const otherOpenedModals = this._element.nativeElement.parentElement.querySelectorAll('.in[bsModal]');
    if (!otherOpenedModals.length) {
      return;
    }
    otherOpenedModals[otherOpenedModals.length - 1].focus();
  }

  /** @internal */
  protected resetAdjustments(): void {
    this._renderer.setStyle(
      this._element.nativeElement,
      'paddingLeft',
      ''
    );
    this._renderer.setStyle(
      this._element.nativeElement,
      'paddingRight',
      ''
    );
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

    this.originalBodyPadding = parseInt(
      window
        .getComputedStyle(document.body)
        .getPropertyValue('padding-right') || 0,
      10
    );

    if (this.isBodyOverflowing) {
      document.body.style.paddingRight = `${this.originalBodyPadding +
      this.scrollbarWidth}px`;
    }
  }

  protected resetScrollbar(): void {
    document.body.style.paddingRight = this.originalBodyPadding + 'px';
  }

  // thx d.walsh
  protected getScrollbarWidth(): number {
    const scrollDiv = this._renderer.createElement('div');
    this._renderer.addClass(scrollDiv, CLASS_NAME.SCROLLBAR_MEASURER);
    this._renderer.appendChild(document.body, scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this._renderer.removeChild(document.body, scrollDiv);

    return scrollbarWidth;
  }
}
