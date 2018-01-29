// tslint:disable:max-file-line-count
// todo: add delay support
// todo: merge events onShow, onShown, etc...
// todo: add global positioning configuration?
import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  Injector,
  NgZone,
  Provider,
  ReflectiveInjector,
  Renderer2,
  TemplateRef,
  Type,
  ViewContainerRef
} from '@angular/core';
import { PositioningOptions, PositioningService } from '../positioning/index';
import { listenToTriggersV2, registerOutsideClick } from '../utils/triggers';
import { ContentRef } from './content-ref.class';
import { ListenOptions } from './listen-options.model';

export class ComponentLoader<T> {
  onBeforeShow: EventEmitter<any> = new EventEmitter();
  onShown: EventEmitter<any> = new EventEmitter();
  onBeforeHide: EventEmitter<any> = new EventEmitter();
  onHidden: EventEmitter<any> = new EventEmitter();

  instance: T;
  _componentRef: ComponentRef<T>;
  _inlineViewRef: EmbeddedViewRef<T>;

  private _providers: Provider[] = [];
  private _componentFactory: ComponentFactory<T>;
  private _zoneSubscription: any;
  private _contentRef: ContentRef;
  private _innerComponent: ComponentRef<T>;

  private _unregisterListenersFn: Function;

  get isShown(): boolean {
    if (this._isHiding) {
      return false;
    }

    return !!this._componentRef;
  }

  private _isHiding = false;

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

  private _listenOpts: ListenOptions = {};
  private _globalListener = Function.prototype;

  /**
   * Do not use this directly, it should be instanced via
   * `ComponentLoadFactory.attach`
   * @internal
   */
  // tslint:disable-next-line
  public constructor(
    private _viewContainerRef: ViewContainerRef,
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _injector: Injector,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _ngZone: NgZone,
    private _applicationRef: ApplicationRef,
    private _posService: PositioningService
  ) {}

  attach(compType: Type<T>): ComponentLoader<T> {
    this._componentFactory = this._componentFactoryResolver
      .resolveComponentFactory<T>(compType);

    return this;
  }

  // todo: add behaviour: to target element, `body`, custom element
  to(container?: string): ComponentLoader<T> {
    this.container = container || this.container;

    return this;
  }

  position(opts?: PositioningOptions): ComponentLoader<T> {
    this.attachment = opts.attachment || this.attachment;
    this._elementRef = (opts.target as ElementRef) || this._elementRef;

    return this;
  }

  provide(provider: Provider): ComponentLoader<T> {
    this._providers.push(provider);

    return this;
  }

  // todo: appendChild to element or document.querySelector(this.container)

  show(opts: {
    content?: string | TemplateRef<any>;
    context?: any;
    initialState?: any; [key: string]: any;
  } = {}
  ): ComponentRef<T> {

    this._subscribePositioning();
    this._innerComponent = null;

    if (!this._componentRef) {
      this.onBeforeShow.emit();
      this._contentRef = this._getContentRef(opts.content, opts.context, opts.initialState);
      const injector = ReflectiveInjector.resolveAndCreate(this._providers, this._injector);

      this._componentRef = this._componentFactory.create(injector, this._contentRef.nodes);
      this._applicationRef.attachView(this._componentRef.hostView);
      // this._componentRef = this._viewContainerRef
      //   .createComponent(this._componentFactory, 0, injector, this._contentRef.nodes);
      this.instance = this._componentRef.instance;

      Object.assign(this._componentRef.instance, opts);

      if (this.container instanceof ElementRef) {
        this.container.nativeElement.appendChild(
          this._componentRef.location.nativeElement
        );
      }

      if (this.container === 'body' && typeof document !== 'undefined') {
        document
          .querySelector(this.container as string)
          .appendChild(this._componentRef.location.nativeElement);
      }

      if (
        !this.container &&
        this._elementRef &&
        this._elementRef.nativeElement.parentElement
      ) {
        this._elementRef.nativeElement.parentElement.appendChild(
          this._componentRef.location.nativeElement
        );
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
      this._componentRef.changeDetectorRef.detectChanges();
      this.onShown.emit(this._componentRef.instance);
    }

    this._registerOutsideClick();

    return this._componentRef;
  }

  hide(): ComponentLoader<T> {
    if (!this._componentRef) {
      return this;
    }

    this.onBeforeHide.emit(this._componentRef.instance);

    const componentEl = this._componentRef.location.nativeElement;
    componentEl.parentNode.removeChild(componentEl);
    if (this._contentRef.componentRef) {
      this._contentRef.componentRef.destroy();
    }
    this._componentRef.destroy();
    if (this._viewContainerRef && this._contentRef.viewRef) {
      this._viewContainerRef.remove(
        this._viewContainerRef.indexOf(this._contentRef.viewRef)
      );
    }
    if (this._contentRef.viewRef) {
      this._contentRef.viewRef.destroy();
    }
    // this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._componentRef.hostView));
    //
    // if (this._contentRef.viewRef && this._viewContainerRef.indexOf(this._contentRef.viewRef) !== -1) {
    //   this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
    // }

    this._contentRef = null;
    this._componentRef = null;
    this._removeGlobalListener();

    this.onHidden.emit();

    return this;
  }

  toggle(): void {
    if (this.isShown) {
      this.hide();

      return;
    }

    this.show();
  }

  dispose(): void {
    if (this.isShown) {
      this.hide();
    }

    this._unsubscribePositioning();

    if (this._unregisterListenersFn) {
      this._unregisterListenersFn();
    }
  }

  listen(listenOpts: ListenOptions): ComponentLoader<T> {
    this.triggers = listenOpts.triggers || this.triggers;
    this._listenOpts.outsideClick = listenOpts.outsideClick;
    listenOpts.target = listenOpts.target || this._elementRef.nativeElement;

    const hide = (this._listenOpts.hide = () =>
      listenOpts.hide ? listenOpts.hide() : void this.hide());
    const show = (this._listenOpts.show = (registerHide: Function) => {
      listenOpts.show ? listenOpts.show(registerHide) : this.show(registerHide);
      registerHide();
    });

    const toggle = (registerHide: Function) => {
      this.isShown ? hide() : show(registerHide);
    };

    this._unregisterListenersFn = listenToTriggersV2(this._renderer, {
      target: listenOpts.target,
      triggers: listenOpts.triggers,
      show,
      hide,
      toggle
    });

    return this;
  }

  _removeGlobalListener() {
    if (this._globalListener) {
      this._globalListener();
      this._globalListener = null;
    }
  }

  attachInline(
    vRef: ViewContainerRef,
    template: TemplateRef<any>
  ): ComponentLoader<T> {
    this._inlineViewRef = vRef.createEmbeddedView(template);

    return this;
  }

  _registerOutsideClick(): void {
    if (!this._componentRef || !this._componentRef.location) {
      return;
    }
    // why: should run after first event bubble
    if (this._listenOpts.outsideClick) {
      const target = this._componentRef.location.nativeElement;
      setTimeout(() => {
        this._globalListener = registerOutsideClick(this._renderer, {
          targets: [target, this._elementRef.nativeElement],
          outsideClick: this._listenOpts.outsideClick,
          hide: () => this._listenOpts.hide()
        });
      });
    }
  }

  getInnerComponent(): ComponentRef<T> {
    return this._innerComponent;
  }

  private _subscribePositioning(): void {
    if (this._zoneSubscription || !this.attachment) {
      return;
    }

    this._zoneSubscription = this._ngZone.onStable.subscribe(() => {
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

  private _getContentRef(
    content: string | TemplateRef<any> | any,
    context?: any,
    initialState?: any
  ): ContentRef {
    if (!content) {
      return new ContentRef([]);
    }

    if (content instanceof TemplateRef) {
      if (this._viewContainerRef) {
        const _viewRef = this._viewContainerRef
          .createEmbeddedView<TemplateRef<T>>(content, context);
        _viewRef.markForCheck();

        return new ContentRef([_viewRef.rootNodes], _viewRef);
      }
      const viewRef = content.createEmbeddedView({});
      this._applicationRef.attachView(viewRef);

      return new ContentRef([viewRef.rootNodes], viewRef);
    }

    if (typeof content === 'function') {
      const contentCmptFactory = this._componentFactoryResolver.resolveComponentFactory(
        content
      );
      const modalContentInjector = ReflectiveInjector.resolveAndCreate(
        [...this._providers],
        this._injector
      );
      const componentRef = contentCmptFactory.create(modalContentInjector);
      Object.assign(componentRef.instance, initialState);
      this._applicationRef.attachView(componentRef.hostView);

      return new ContentRef(
        [[componentRef.location.nativeElement]],
        componentRef.hostView,
        componentRef
      );
    }

    return new ContentRef([[this._renderer.createText(`${content}`)]]);
  }
}
