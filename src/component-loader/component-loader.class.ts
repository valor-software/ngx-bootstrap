// todo: add delay support
// todo: merge events onShow, onShown, etc...
// todo: add global positioning configuration?
import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Injector,
  NgZone,
  Provider,
  ReflectiveInjector,
  Renderer,
  TemplateRef,
  Type,
  ViewContainerRef
} from '@angular/core';
import { PositioningOptions, PositioningService } from '../positioning';
import { listenToTriggers } from '../utils/triggers';
import { ContentRef } from './content-ref.class';

export interface ListenOptions {
  target?: ElementRef;
  triggers?: string;
  show?: Function;
  hide?: Function;
  toggle?: Function;
}

export class ComponentLoader<T> {
  public onBeforeShow: EventEmitter<any> = new EventEmitter();
  public onShown: EventEmitter<any> = new EventEmitter();
  public onBeforeHide: EventEmitter<any> = new EventEmitter();
  public onHidden: EventEmitter<any> = new EventEmitter();

  public instance: T;
  public _componentRef: ComponentRef<T>;

  private _providers: Provider[] = [];
  private _componentFactory: ComponentFactory<T>;
  private _zoneSubscription: any;
  private _contentRef: ContentRef;
  private _innerComponent: ComponentRef<T>;

  private _unregisterListenersFn: Function;

  public get isShown(): boolean {
    return !!this._componentRef;
  };

  /**
   * Placement of a component. Accepts: "top", "bottom", "left", "right"
   */
  private attachment: string;

  /**
   * A selector specifying the element the popover should be appended to.
   * Currently only supports "body".
   */
  private container: string | ElementRef | any;

  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  private triggers: string;

  /**
   * Do not use this directly, it should be instanced via
   * `ComponentLoadFactory.attach`
   * @internal
   */
  // tslint:disable-next-line
  public constructor(private _viewContainerRef: ViewContainerRef,
                     private _renderer: Renderer,
                     private _elementRef: ElementRef,
                     private _injector: Injector,
                     private _componentFactoryResolver: ComponentFactoryResolver,
                     private _ngZone: NgZone,
                     private _applicationRef: ApplicationRef,
                     private _posService: PositioningService) {
  }

  public attach(compType: Type<T>): ComponentLoader<T> {
    this._componentFactory = this._componentFactoryResolver
      .resolveComponentFactory<T>(compType);
    return this;
  }

  // todo: add behaviour: to target element, `body`, custom element
  public to(container?: string): ComponentLoader<T> {
    this.container = container || this.container;
    return this;
  }

  public position(opts?: PositioningOptions): ComponentLoader<T> {
    this.attachment = opts.attachment || this.attachment;
    this._elementRef = opts.target as ElementRef || this._elementRef;
    return this;
  }

  public provide(provider: Provider): ComponentLoader<T> {
    this._providers.push(provider);
    return this;
  }

  // todo: appendChild to element or document.querySelector(this.container)
  public show(opts: { content?: string | TemplateRef<any>, [key: string]: any } = {}): ComponentRef<T> {
    this._subscribePositioning();
    this._innerComponent = null;

    if (!this._componentRef) {
      this.onBeforeShow.emit();
      this._contentRef = this._getContentRef(opts.content);
      const injector = ReflectiveInjector.resolveAndCreate(this._providers, this._injector);

      this._componentRef = this._componentFactory.create(injector, this._contentRef.nodes);
      this._applicationRef.attachView(this._componentRef.hostView);
      // this._componentRef = this._viewContainerRef
      //   .createComponent(this._componentFactory, 0, injector, this._contentRef.nodes);
      this.instance = this._componentRef.instance;

      Object.assign(this._componentRef.instance, opts);

      if (this.container instanceof ElementRef) {
        this.container.nativeElement
          .appendChild(this._componentRef.location.nativeElement);
      }

      if (this.container === 'body' && typeof document !== 'undefined') {
        document.querySelector(this.container as string)
          .appendChild(this._componentRef.location.nativeElement);
      }

      if (!this.container && this._elementRef) {
        this._elementRef.nativeElement.parentElement
          .appendChild(this._componentRef.location.nativeElement);
      }

      // we need to manually invoke change detection since events registered
      // via
      // Renderer::listen() are not picked up by change detection with the
      // OnPush strategy
      if (this._contentRef.componentRef) {
        this._innerComponent = this._contentRef.componentRef.instance;
        this._contentRef.componentRef.changeDetectorRef.markForCheck();
        this._contentRef.componentRef.changeDetectorRef.detectChanges();
      }
      this._componentRef.changeDetectorRef.markForCheck();
      this.onShown.emit(this._componentRef.instance);
    }
    return this._componentRef;
  }

  public hide(): ComponentLoader<T> {
    if (!this._componentRef) {
      return this;
    }

    this.onBeforeHide.emit(this._componentRef.instance);

    const componentEl = this._componentRef.location.nativeElement;
    componentEl.parentNode.removeChild(componentEl);
    this._componentRef.destroy();
    if (this._viewContainerRef && this._contentRef.viewRef) {
      this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
    }
    // this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._componentRef.hostView));
    //
    // if (this._contentRef.viewRef && this._viewContainerRef.indexOf(this._contentRef.viewRef) !== -1) {
    //   this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
    // }

    this._contentRef = null;
    this._componentRef = null;

    this.onHidden.emit();
    return this;
  }

  public toggle(): void {
    if (this.isShown) {
      this.hide();
      return;
    }

    this.show();
  }

  public dispose(): void {
    if (this.isShown) {
      this.hide();
    }

    this._unsubscribePositioning();

    if (this._unregisterListenersFn) {
      this._unregisterListenersFn();
    }
  }

  public listen(listenOpts: ListenOptions): ComponentLoader<T> {
    this.triggers = listenOpts.triggers || this.triggers;

    listenOpts.target = listenOpts.target || this._elementRef;
    listenOpts.show = listenOpts.show || (() => this.show());
    listenOpts.hide = listenOpts.hide || (() => this.hide());
    listenOpts.toggle = listenOpts.toggle || (() => this.isShown
      ? listenOpts.hide()
      : listenOpts.show());

    this._unregisterListenersFn = listenToTriggers(
      this._renderer,
      listenOpts.target.nativeElement,
      this.triggers,
      listenOpts.show,
      listenOpts.hide,
      listenOpts.toggle);

    return this;
  }

  public getInnerComponent(): ComponentRef<T> {
    return this._innerComponent;
  }

  private _subscribePositioning(): void {
    if (this._zoneSubscription || !this.attachment) {
      return;
    }

    this._zoneSubscription = this._ngZone
      .onStable.subscribe(() => {
        if (!this._componentRef) {
          return;
        }
        this._posService.position({
          element: this._componentRef.location,
          target: this._elementRef,
          attachment: this.attachment,
          appendToBody: this.container === 'body'
        });
      });
  }

  private _unsubscribePositioning(): void {
    if (!this._zoneSubscription) {
      return;
    }
    this._zoneSubscription.unsubscribe();
    this._zoneSubscription = null;
  }

  private _getContentRef(content: string | TemplateRef<any> | any): ContentRef {
    if (!content) {
      return new ContentRef([]);
    }

    if (content instanceof TemplateRef) {
      if (this._viewContainerRef) {
        const viewRef = this._viewContainerRef.createEmbeddedView<TemplateRef<T>>(content);
        return new ContentRef([viewRef.rootNodes], viewRef);
      }
      const viewRef = content.createEmbeddedView({});
      this._applicationRef.attachView(viewRef);
      return new ContentRef([viewRef.rootNodes], viewRef);
    }

    if (typeof content === 'function') {
      const contentCmptFactory = this._componentFactoryResolver.resolveComponentFactory(content);
      const modalContentInjector = ReflectiveInjector.resolveAndCreate([...this._providers, content], this._injector);
      const componentRef = contentCmptFactory.create(modalContentInjector);
      return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
    }
    return new ContentRef([[this._renderer.createText(null, `${content}`)]]);
  }
}
