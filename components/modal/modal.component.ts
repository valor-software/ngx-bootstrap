import {
  Component,
  DynamicComponentLoader,
  ComponentRef,
  ReflectiveInjector,
  Provider,
  ViewContainerRef,
  ApplicationRef,
  AfterViewInit,
  ComponentResolver,
  ComponentFactory,
  ElementRef, Inject, Injector
} from '@angular/core';
import {ModalBackdropComponent, ModalBackdropOptions} from './modal-backdrop.component';
import {modalConfig} from './modal-options.class';

import {ComponentsHelper} from '../utils/components.helper';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

@Component({
  selector: 'bs-modal',
  template: '<span>hello world</span>',
  // providers: [ComponentsHelper]
})
export class ModalComponent implements AfterViewInit {
  // seems like an Options
  public animate:boolean = true;

  private ignoreBackdropClick:boolean;
  private isShown:boolean = false;

  // reference to backdrop component
  private backdrop:Promise<ComponentRef<ModalBackdropComponent>>;

  private element:ElementRef;
  private componentsHelper:ComponentsHelper;
  public constructor(element:ElementRef, @Inject(ComponentsHelper) componentsHelper:ComponentsHelper) {
    this.element = element;
    this.componentsHelper = componentsHelper;
  }

  public ngAfterViewInit():any {
    this.showBackdrop();
  }

  public hide():void {
  }

  // todo: original show was calling a callback when done, but we can use promise
  private showBackdrop(callback?:Function):void {
    // todo: remove this
    this.isShown = true;
    // todo: remove this
    if (this.isShown && modalConfig.backdrop) {
      this.backdrop = this.componentsHelper
        .appendNextToRoot(ModalBackdropComponent, ModalBackdropOptions, new ModalBackdropOptions({animate: false}));
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

        // if (!doAnimate) {
        //   callback()
        //   return
        // }

        // todo: enable end of animation, this is delay before showing modal window
        // $(this._backdrop)
        //   .one(Util.TRANSITION_END, callback)
        //   .emulateTransitionEnd(BACKDROP_TRANSITION_DURATION)
        setTimeout(callback, BACKDROP_TRANSITION_DURATION);
      });
    } else if (!this.isShown && this.backdrop) {
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
