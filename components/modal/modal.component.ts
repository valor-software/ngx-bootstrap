import {
  ComponentRef,
  AfterViewInit,
  ElementRef,
  Inject,
  EventEmitter,
  ViewContainerRef,
  Renderer,
  Directive
} from '@angular/core';
import {ModalBackdropComponent, ModalBackdropOptions} from './modal-backdrop.component';
import {modalConfig, ClassName} from './modal-options.class';
import {ComponentsHelper} from '../utils/components.helper';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

@Directive({
  selector: '[bsModal]',
  exportAs: 'modal'
})
export class ModalDirective implements AfterViewInit {
  // seems like an Options
  public isAnimated:boolean = true;

  public get isShown():boolean {
    return this._isShown;
  }

  public onShow:EventEmitter<ModalDirective> = new EventEmitter();
  public onShown:EventEmitter<ModalDirective> = new EventEmitter();
  public onHide:EventEmitter<ModalDirective> = new EventEmitter();
  public onHidden:EventEmitter<ModalDirective> = new EventEmitter();

  protected _isShown:boolean = false;
  private ignoreBackdropClick:boolean;

  // reference to backdrop component
  private backdrop:Promise<ComponentRef<ModalBackdropComponent>>;

  private element:ElementRef;
  private renderer:Renderer;
  private componentsHelper:ComponentsHelper;

  public constructor(element:ElementRef,
                     renderer:Renderer,
                     @Inject(ComponentsHelper) componentsHelper:ComponentsHelper) {
    this.element = element;
    this.renderer = renderer;
    this.componentsHelper = componentsHelper;
  }

  public ngAfterViewInit():any {
    this.show();
  }

  public toggle(relatedTarget?:ViewContainerRef):void {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }

  public show(relatedTarget?:ViewContainerRef):void {
    this.onShow.emit(this);
    // todo: in original bs there are was a way to prevent modal from showing
    if (this._isShown) {
      return;
    }

    this._isShown = true;

    // this._checkScrollbar()
    // this._setScrollbar()
    // todo: rewrite using global
    if (typeof document !== 'undefined') {
      document.body.classList.add(ClassName.OPEN);
    }
    // this._setEscapeEvent()
    // this._setResizeEvent()

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

    this.showBackdrop(() => {
      this.showElement(relatedTarget);
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

    // this._setEscapeEvent();
    // this._setResizeEvent();

    // $(document).off(Event.FOCUSIN)

    // todo: it can be done via `host`
    this.element.nativeElement.classList.remove(ClassName.IN);

    // $(this._element).off(Event.CLICK_DISMISS)
    // $(this._dialog).off(Event.MOUSEDOWN_DISMISS)

    if (this.isAnimated) {
      setTimeout(TRANSITION_DURATION, () => this.hideModal());
    } else {
      this.hideModal();
    }
  }

  private showElement(relatedTarget?:ViewContainerRef):void {
    // todo: what is this?
    if (!this.element.nativeElement.parentNode ||
      (this.element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE)) {
      // don't move modals dom position
      if (typeof document !== 'undefined') {
        document.body.appendChild(this.element.nativeElement);
      }
    }

    // todo: it can be done via `host`
    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'block');
    this.renderer.setElementAttribute(this.element.nativeElement, 'aria-hidden', 'false');
    this.renderer.setElementProperty(this.element.nativeElement, 'scrollTop', 0);

    // todo: implement reflow
    // if (transition) {
    //   Util.reflow(this._element)
    // }

    // todo: it can be done via `host`
    this.element.nativeElement.classList.add(ClassName.IN);

    // if (this._config.focus) {
    //   this._enforceFocus()
    // }

    this.onShown.emit(this);
    const transitionComplete = () => {
      // if (this._config.focus) {
      this.element.nativeElement.focus();
      // }
      this.onShown.emit(this);
    };

    if (this.isAnimated) {
      setTimeout(transitionComplete, TRANSITION_DURATION);
    } else {
      transitionComplete();
    }
  }

  private hideModal():void {
    this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
    this.renderer.setElementAttribute(this.element.nativeElement, 'aria-hidden', 'true');
    console.log('hide')
    this.showBackdrop(() => {
      // todo: rewrite using global
      if (typeof document !== 'undefined') {
        document.body.classList.add(ClassName.OPEN);
      }
      // this._resetAdjustments();
      // this._resetScrollbar();
      this.onHidden.emit(this);
    });
  }

  // todo: original show was calling a callback when done, but we can use promise
  private showBackdrop(callback?:Function):void {
    if (this._isShown && modalConfig.backdrop) {
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

            if (modalConfig.backdrop === 'static') {
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
}
