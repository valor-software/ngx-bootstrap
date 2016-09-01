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
  Injector,
  Input,
  OnDestroy,
  Output,
  Renderer
} from '@angular/core';
import { Type } from '@angular/core';

import { ComponentsHelper } from '../utils/components-helper.service';
import { Utils } from '../utils/utils.class';
import { ModalBackdropComponent, ModalBackdropOptions } from './modal-backdrop.component';
import { ClassName, modalConfigDefaults, ModalOptions, Selector } from './modal-options.class';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

@Directive({
  selector: '[bsModal]',
  exportAs: 'bs-modal'
})
export class ModalDirective implements AfterViewInit, OnDestroy {
  @Input()
  public set config(conf:ModalOptions) {
    this._config = this.getConfig(conf);
  };

  @Output() public onShow:EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  @Output() public onShown:EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  @Output() public onHide:EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  @Output() public onHidden:EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();

  public get config():ModalOptions {
    return this._config;

  }

  // seems like an Options
  public isAnimated:boolean = true;

  public get isShown():boolean {
    return this._isShown;
  }

  // todo: implement _dialog
  protected _dialog:any;

  protected _config:ModalOptions;
  protected _isShown:boolean = false;

  private isBodyOverflowing:boolean = false;
  private originalBodyPadding:number = 0;
  private scrollbarWidth:number = 0;

  // reference to backdrop component
  private backdrop:ComponentRef<ModalBackdropComponent>;

  private get document():any {
    return this.componentsHelper.getDocument();
  };

  /** Host element manipulations */
  // @HostBinding(`class.${ClassName.IN}`) private _addClassIn:boolean;

  @HostListener('click', ['$event'])
  protected onClick(event:any):void {
    if (this.config.ignoreBackdropClick || this.config.backdrop === 'static' || event.target !== this.element.nativeElement) {
      return;
    }

    this.hide(event);
  }

  // todo: consider preventing default and stopping propagation
  @HostListener('keydown.esc')
  protected onEsc():void {
    if (this.config.keyboard) {
      this.hide();
    }
  }

  public constructor(private element:ElementRef,
                     private renderer:Renderer,
                     private injector:Injector,
                     private componentsHelper:ComponentsHelper) {
  }

  public ngOnDestroy():any {
    this.config = void 0;
    // this._element             = null
    // this._dialog              = null
    // this._backdrop            = null
    this._isShown = void 0;
    this.isBodyOverflowing = void 0;
    this.originalBodyPadding = void 0;
    this.scrollbarWidth = void 0;
  }

  public ngAfterViewInit():any {
    this._config = this._config || this.getConfig();
  }

  /** Public methods */

  public toggle(/*relatedTarget?:ViewContainerRef*/):void {
    return this._isShown ? this.hide() : this.show(/*relatedTarget*/);
  }

  public show(/*relatedTarget?:ViewContainerRef*/):void {
    this.onShow.emit(this);
    if (this._isShown) {
      return;
    }

    this._isShown = true;

    this.checkScrollbar();
    this.setScrollbar();

    if (this.document && this.document.body) {
      this.renderer.setElementClass(this.document.body, ClassName.OPEN, true);
    }

    this.showBackdrop(() => {
      this.showElement(/*relatedTarget*/);
    });
  }

  public hide(event?:Event):void {
    if (event) {
      event.preventDefault();
    }

    this.onHide.emit(this);

    // todo: add an option to prevent hiding
    if (!this._isShown) {
      return;
    }

    this._isShown = false;
    this.renderer.setElementClass(this.element.nativeElement, ClassName.IN, false);
    // this._addClassIn = false;

    if (this.isAnimated) {
      setTimeout(() => this.hideModal(), TRANSITION_DURATION);
    } else {
      this.hideModal();
    }
  }

  /** Private methods */
  private getConfig(config?:ModalOptions):ModalOptions {
    return Object.assign({}, modalConfigDefaults, config);
  }

  /**
   *  Show dialog
   */
  private showElement(/*relatedTarget?:ViewContainerRef*/):void {
    // todo: replace this with component helper usage `add to root`
    if (!this.element.nativeElement.parentNode ||
      (this.element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE)) {
      // don't move modals dom position
      if (this.document && this.document.body) {
        this.document.body.appendChild(this.element.nativeElement);
      }
    }

    this.renderer.setElementAttribute(this.element.nativeElement, 'aria-hidden', 'false');
    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'block');
    this.renderer.setElementProperty(this.element.nativeElement, 'scrollTop', 0);

    if (this.isAnimated) {
      Utils.reflow(this.element.nativeElement);
    }

    // this._addClassIn = true;
    this.renderer.setElementClass(this.element.nativeElement, ClassName.IN, true);

    this.onShown.emit(this);
    const transitionComplete = () => {
      if (this._config.focus) {
        this.element.nativeElement.focus();
      }
      this.onShown.emit(this);
    };

    if (this.isAnimated) {
      setTimeout(transitionComplete, TRANSITION_DURATION);
    } else {
      transitionComplete();
    }
  }

  private hideModal():void {
    this.renderer.setElementAttribute(this.element.nativeElement, 'aria-hidden', 'true');
    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
    this.showBackdrop(() => {
      if (this.document && this.document.body) {
        this.renderer.setElementClass(this.document.body, ClassName.OPEN, false);
      }
      this.resetAdjustments();
      this.resetScrollbar();
      this.onHidden.emit(this);
    });
  }

  // todo: original show was calling a callback when done, but we can use promise
  private showBackdrop(callback?:Function):void {
    if (this._isShown && this.config.backdrop) {
      this.backdrop = this.componentsHelper
        .appendNextToRoot(
          ModalBackdropComponent,
          ModalBackdropOptions,
          new ModalBackdropOptions({animate: false}),
          this.injector);

      if (this.isAnimated) {
        this.backdrop.instance.isAnimated = this.isAnimated;
        Utils.reflow(this.backdrop.instance.element.nativeElement);
      }

      this.backdrop.instance.isShown = true;
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
        setTimeout(callbackRemove, BACKDROP_TRANSITION_DURATION);
      } else {
        callbackRemove();
      }
    } else if (callback) {
      callback();
    }
  }

  private removeBackdrop():void {
    if (this.backdrop) {
      this.backdrop.destroy();
      this.backdrop = void 0;
    }
  }

  /** Events tricks */

  // no need for it
  // private setEscapeEvent():void {
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

  // private setResizeEvent():void {
  // console.log(this.renderer.listenGlobal('', Event.RESIZE));
  // if (this._isShown) {
  //   $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this))
  // } else {
  //   $(window).off(Event.RESIZE)
  // }
  // }

  private resetAdjustments():void {
    this.renderer.setElementStyle(this.element.nativeElement, 'paddingLeft', '');
    this.renderer.setElementStyle(this.element.nativeElement, 'paddingRight', '');
  }

  /** Scroll bar tricks */

  private checkScrollbar():void {
    // this._isBodyOverflowing = document.body.clientWidth < window.innerWidth
    this.isBodyOverflowing = this.document.body.clientWidth < (Type as any).innerWidth;
    this.scrollbarWidth = this.getScrollbarWidth();
  }

  private setScrollbar():void {
    if (!this.document) {
      return;
    }

    const fixedEl = this.document.querySelector(Selector.FIXED_CONTENT);

    if (!fixedEl) {
      return;
    }

    const bodyPadding = parseInt(Utils.getStyles(fixedEl).paddingRight || 0, 10);
    this.originalBodyPadding = parseInt(this.document.body.style.paddingRight || 0, 10);

    if (this.isBodyOverflowing) {
      this.document.body.style.paddingRight = `${bodyPadding + this.scrollbarWidth}px`;
    }
  }

  private resetScrollbar():void {
    this.document.body.style.paddingRight = this.originalBodyPadding;
  }

  // thx d.walsh
  private getScrollbarWidth():number {
    const scrollDiv = this.renderer.createElement(this.document.body, 'div', void 0);
    scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }
}
