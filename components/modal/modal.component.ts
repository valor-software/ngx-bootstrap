import {
  Component, DynamicComponentLoader, ComponentRef, ReflectiveInjector, Provider, provide,
  ViewContainerRef, ApplicationRef, AfterViewInit, ComponentResolver, ComponentFactory, ElementRef
} from '@angular/core';

import {ModalBackdropComponent, ModalBackdropOptions} from './modal-backdrop.component';
import {modalConfig} from './modal-options.class';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

@Component({
  selector: 'bs-modal',
  template: '<span>hello world</span>'
})
export class ModalComponent implements AfterViewInit {
  // seems like an Options
  public animate:boolean = true;

  private ignoreBackdropClick:boolean;
  private isShown:boolean = false;

  // reference to backdrop component
  private backdrop:Promise<ComponentRef<ModalBackdropComponent>>;

  private element:ElementRef;
  private loader:DynamicComponentLoader;
  private viewContainerRef:ViewContainerRef;
  private componentResolver:ComponentResolver;

  public constructor(element:ElementRef, loader:DynamicComponentLoader, viewContainerRef:ViewContainerRef, componentResolver:ComponentResolver) {
    this.element = element;
    this.loader = loader;
    this.viewContainerRef = viewContainerRef;
    this.componentResolver = componentResolver;
  }

  public ngAfterViewInit():any {
    this.showBackdrop();
  }



  public hide():void {
  }

  public appendToRoot_():Promise<ComponentRef<ModalBackdropComponent>> {
    const viewContainerRef = this.viewContainerRef;

    const options = new ModalBackdropOptions({animate: true});
    let binding = ReflectiveInjector.resolve([
      new Provider(ModalBackdropOptions, {useValue: options})
    ]);

    // const injector = ReflectiveInjector.resolveAndCreate([
    //   provide(ModalBackdropOptions, {useValue: options})
    // ]);

    return this.loader
    // .loadAsRoot(ModalBackdropComponent, document.body, injector)
      .loadNextToLocation(ModalBackdropComponent, viewContainerRef, binding)
      .then((componentRef:ComponentRef<any>) => {
        return componentRef;
      });
  }

  // todo: make this shit working
  public appendToRoot():Promise<ComponentRef<ModalBackdropComponent>> {
    return this.componentResolver
      .resolveComponent(ModalBackdropComponent)
      .then((componentFactory:ComponentFactory<ModalBackdropComponent>) => {
        const viewContainerRef = this.viewContainerRef;
        const options = new ModalBackdropOptions({animate: true});
        let bindings = ReflectiveInjector.resolve([
          new Provider(ModalBackdropOptions, {useValue: options})
        ]);
        const ctxInjector = viewContainerRef.parentInjector;

        const childInjector = Array.isArray(bindings) && bindings.length > 0 ?
          ReflectiveInjector.fromResolvedProviders(bindings, ctxInjector) : ctxInjector;
        return viewContainerRef.createComponent(componentFactory, viewContainerRef.length, childInjector);
      });
  }

  // todo: original show was calling a callback when done, but we can use promise
  private showBackdrop(callback?:Function):void {
    // todo: remove this
    this.isShown = true;
    // todo: remove this
    if (this.isShown && modalConfig.backdrop) {
      this.backdrop = this.appendToRoot();
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
