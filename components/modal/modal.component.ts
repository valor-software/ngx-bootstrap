// todo: should we support enforce focus in?
// todo: in original bs there are was a way to prevent modal from showing
// todo: original modal had resize events

import {
  ComponentRef,
  AfterViewInit,
  ElementRef,
  Inject,
  EventEmitter,
  ViewContainerRef,
  Renderer,
  Directive,
  HostListener,
  Input,
  OnDestroy,
  HostBinding, QueryList, Query
} from '@angular/core';
import {global} from '@angular/core/src/facade/lang';
import {DOCUMENT} from '@angular/platform-browser';
import {ModalBackdropComponent, ModalBackdropOptions} from './modal-backdrop.component';
import {modalConfigDefaults, ClassName, ModalOptions, Selector} from './modal-options.class';
import {ComponentsHelper} from '../utils/components-helper.service';
import {Utils} from '../utils/utils.class';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

@Directive({
  selector: '[bsModal]',
  exportAs: 'modal'
})
export class ModalDirective implements AfterViewInit, OnDestroy {
  @Input()
  public set config(conf:ModalOptions) {
    this._config = this.getConfig(conf);
  };

  public get config():ModalOptions {
    return this._config;

  }

  // seems like an Options
  public isAnimated:boolean = true;

  public get isShown():boolean {
    return this._isShown;
  }

  public onShow:EventEmitter<ModalDirective> = new EventEmitter();
  public onShown:EventEmitter<ModalDirective> = new EventEmitter();
  public onHide:EventEmitter<ModalDirective> = new EventEmitter();
  public onHidden:EventEmitter<ModalDirective> = new EventEmitter();

  // todo: implement _dialog
  protected _dialog:any;

  protected _config:ModalOptions;
  protected _isShown:boolean = false;

  private isBodyOverflowing:boolean = false;
  private ignoreBackdropClick:boolean = false;
  private originalBodyPadding:number = 0;
  private scrollbarWidth:number = 0;

  // reference to backdrop component
  private backdrop:Promise<ComponentRef<ModalBackdropComponent>>;

  private element:ElementRef;
  private renderer:Renderer;
  private document:any;
  private componentsHelper:ComponentsHelper;

  /** Host element manipulations */
  // this.renderer.setElementStyle(this.element.nativeElement, 'display', 'block');
  @HostBinding('style.display')
  private get _displayStyle():string {
    return this._isHidden ? 'node' : 'block';
  }

  // this.renderer.setElementAttribute(this.element.nativeElement, 'aria-hidden', 'false');
  @HostBinding('attr.aria-hidden') private _isHidden:boolean;
  @HostBinding(`class.${ClassName.IN}`) private _classIn:boolean;

  @HostListener('click', ['$event'])
  protected onClick(e:any):void {
    this.hide(e);
  }

  // todo: consider preventing default and stoping propogation
  @HostListener('keydown.esc') protected onEsc():void { this.hide(); }
  
  public constructor(element:ElementRef,
                     renderer:Renderer,
                     @Inject(DOCUMENT) document:any,
                     @Inject(ComponentsHelper) componentsHelper:ComponentsHelper) {
    this.element = element;
    this.renderer = renderer;
    this.document = document;
    this.componentsHelper = componentsHelper;
  }

  public ngOnDestroy():any {
    this.config = void 0;
    // this._element             = null
    // this._dialog              = null
    // this._backdrop            = null
    this._isShown = void 0;
    this.isBodyOverflowing = void 0;
    this.ignoreBackdropClick = void 0;
    this.originalBodyPadding = void 0;
    this.scrollbarWidth = void 0;

    this.document = void 0;
  }

  public ngAfterViewInit():any {
    console.log(this.eslist);
    this._config = this._config || this.getConfig();
    this.show();
  }

  /** Public methods */

  public toggle(relatedTarget?:ViewContainerRef):void {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }

  public show(relatedTarget?:ViewContainerRef):void {
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

    // todo: implement closing modal
    // $(this._element).on(
    //   Event.CLICK_DISMISS,
    //   Selector.DATA_DISMISS,
    //   $.proxy(this.hide, this)
    // )
    // todo: implement closing modal
    // $(this._dialog).on(Event.MOUSEDOWN_DISMISS, () => {
    //   $(this._element).one(Event.MOUSEUP_DISMISS, (event) => {
    //     if ($(event.target).is(this._element)) {
    //       this._ignoreBackdropClick = true
    //     }
    //   })
    // })

    this.showBackdrop(() => { this.showElement(relatedTarget); });
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
    this._classIn = false;

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
   * @param relatedTarget
   */
  private showElement(relatedTarget?:ViewContainerRef):void {
    // todo: replace this with component helper usage `add to root`
    if (!this.element.nativeElement.parentNode ||
      (this.element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE)) {
      // don't move modals dom position
      if (typeof document !== 'undefined') {
        document.body.appendChild(this.element.nativeElement);
      }
    }

    this._isHidden = false;
    this.renderer.setElementProperty(this.element.nativeElement, 'scrollTop', 0);

    if (this.isAnimated) {
      Utils.reflow(this.element);
    }

    this._classIn = true;

    // if (this._config.focus) {
    //   this.enforceFocus();
    // }

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
    this._isHidden = false;
    this.showBackdrop(() => {
      if (this.document && this.document.body) {
        this.renderer.setElementClass(this.document.body, ClassName.OPEN, true);
      }
      // this._resetAdjustments();
      // this._resetScrollbar();
      this.onHidden.emit(this);
    });
  }

  // todo: original show was calling a callback when done, but we can use promise
  private showBackdrop(callback?:Function):void {
    if (this._isShown && modalConfigDefaults.backdrop) {
      this.backdrop = this.componentsHelper
        .appendNextToRoot(
          ModalBackdropComponent,
          ModalBackdropOptions,
          new ModalBackdropOptions({animate: false}));

      this.backdrop.then((backdrop:ComponentRef<ModalBackdropComponent>) => {
        // Event.CLICK_DISMISS
        backdrop.instance.onClick
          .subscribe((event:Event)=> {
            if (this.ignoreBackdropClick) {
              this.ignoreBackdropClick = false;
              return;
            }

            if (event.target === event.target) {
              console.log('piu puy')
            }
            // if (event.target !== event.currentTarget) {
            //   return;
            // }

            if (modalConfigDefaults.backdrop === 'static') {
              // todo: focus on window element
              // todo: use renderer?
              this.element.nativeElement.focus();
            } else {
              this.hide();
            }
          });

        /*if (doAnimate) {
         Util.reflow(this._backdrop)
         }*/
        backdrop.instance.isShown = true;
        if (!callback) {
          return;
        }

        if (!this.isAnimated) {
          callback();
          return;
        }

        setTimeout(callback, BACKDROP_TRANSITION_DURATION);
      });
    } else if (!this._isShown && this.backdrop) {
      this.backdrop.then((backdrop:ComponentRef<ModalBackdropComponent>) => {
        backdrop.instance.isShown = false;

        let callbackRemove = () => {
          this.removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if (backdrop.instance.isAnimated) {
          // todo: this is delay before hiding window
          // $(this._backdrop)
          //   .one(Util.TRANSITION_END, callbackRemove)
          //   .emulateTransitionEnd(BACKDROP_TRANSITION_DURATION)
          setTimeout(callbackRemove, BACKDROP_TRANSITION_DURATION);
        } else {
          callbackRemove();
        }
      });
    } else if (callback) {
      callback();
    }
  }

  private removeBackdrop():void {
    if (this.backdrop) {
      this.backdrop.then((backdrop:ComponentRef<ModalBackdropComponent>) => {
        backdrop.destroy();
        this.backdrop = void 0;
      });
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

  /** Scroll bar tricks */

  private checkScrollbar():void {
    // this._isBodyOverflowing = document.body.clientWidth < window.innerWidth
    this.isBodyOverflowing = this.document.body.clientWidth < (global as any).innerWidth;
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
