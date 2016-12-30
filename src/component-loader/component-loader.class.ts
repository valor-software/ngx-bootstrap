// todo: add delay support
// todo: merge events onShow, onShown, etc...
// todo: add global positioning configuration?
import {
  NgZone, ViewContainerRef, ComponentFactoryResolver, Injector, Renderer,
  ElementRef, ComponentRef, ComponentFactory, Type, TemplateRef, EventEmitter,
  Provider, ReflectiveInjector
} from '@angular/core';
import { ContentRef } from './content-ref.class';
import { PositioningService, PositioningOptions } from '../positioning';
import { listenToTriggers } from '../utils/triggers';

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
  private _elementRef: ElementRef;
  private _zoneSubscription: any;
  private _contentRef: ContentRef;
  private _viewContainerRef: ViewContainerRef;
  private _injector: Injector;
  private _renderer: Renderer;
  private _ngZone: NgZone;
  private _componentFactoryResolver: ComponentFactoryResolver;
  private _posService: PositioningService;

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
   * @param _viewContainerRef
   * @param _elementRef
   * @param _injector
   * @param _renderer
   * @param _componentFactoryResolver
   * @param _ngZone
   * @param _posService
   */
  // tslint:disable-next-line
  public constructor(_viewContainerRef: ViewContainerRef, _renderer: Renderer,
                     _elementRef: ElementRef,
                     _injector: Injector, _componentFactoryResolver: ComponentFactoryResolver,
                     _ngZone: NgZone, _posService: PositioningService) {
    this._ngZone = _ngZone;
    this._injector = _injector;
    this._renderer = _renderer;
    this._elementRef = _elementRef;
    this._posService = _posService;
    this._viewContainerRef = _viewContainerRef;
    this._componentFactoryResolver = _componentFactoryResolver;
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

  public show(opts: {content?: string | TemplateRef<any>, [key:string]: any} = {}): ComponentRef<T> {
    this._subscribePositioning();

    if (!this._componentRef) {
      this.onBeforeShow.emit();
      this._contentRef = this._getContentRef(opts.content);
      const injector = ReflectiveInjector.resolveAndCreate(this._providers, this._injector);
      this._componentRef = this._viewContainerRef
        .createComponent(this._componentFactory, 0, injector, this._contentRef.nodes);
      this.instance = this._componentRef.instance;

      Object.assign(this._componentRef.instance, opts);

      if (this.container === 'body' && typeof document !== 'undefined') {
        document.querySelector(this.container as string)
          .appendChild(this._componentRef.location.nativeElement);
      }

      // we need to manually invoke change detection since events registered
      // via
      // Renderer::listen() are not picked up by change detection with the
      // OnPush strategy
      this._componentRef.changeDetectorRef.markForCheck();
      this.onShown.emit(this._componentRef.instance);
    }
    return this._componentRef;
  }

  public hide(): ComponentLoader<T> {
    if (this._componentRef) {
      this.onBeforeHide.emit(this._componentRef.instance);
      this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._componentRef.hostView));
      this._componentRef = null;

      if (this._contentRef.viewRef) {
        this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
        this._contentRef = null;
      }

      this._componentRef = null;
      this.onHidden.emit();
    }
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

  private _getContentRef(content: string | TemplateRef<any>): ContentRef {
    if (!content) {
      return new ContentRef([]);
    }

    if (content instanceof TemplateRef) {
      const viewRef = this._viewContainerRef
        .createEmbeddedView<TemplateRef<T>>(content);
      return new ContentRef([viewRef.rootNodes], viewRef);
    }

    return new ContentRef([[this._renderer.createText(null, `${content}`)]]);
  }
}
