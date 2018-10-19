import { ComponentRef, EmbeddedViewRef, EventEmitter, Provider, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { PositioningOptions } from '../positioning/index';
import { ListenOptions } from './listen-options.model';
export declare class ComponentLoader<T> {
    private _viewContainerRef;
    private _renderer;
    private _elementRef;
    private _injector;
    private _componentFactoryResolver;
    private _ngZone;
    private _applicationRef;
    private _posService;
    onBeforeShow: EventEmitter<any>;
    onShown: EventEmitter<any>;
    onBeforeHide: EventEmitter<any>;
    onHidden: EventEmitter<any>;
    instance: T;
    _componentRef: ComponentRef<T>;
    _inlineViewRef: EmbeddedViewRef<T>;
    private _providers;
    private _componentFactory;
    private _zoneSubscription;
    private _contentRef;
    private _innerComponent;
    private _unregisterListenersFn;
    readonly isShown: boolean;
    private _isHiding;
    /**
     * Placement of a component. Accepts: "top", "bottom", "left", "right"
     */
    private attachment;
    /**
     * A selector specifying the element the popover should be appended to.
     * Currently only supports "body".
     */
    private container;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    private triggers;
    private _listenOpts;
    private _globalListener;
    attach(compType: Type<T>): ComponentLoader<T>;
    to(container?: string): ComponentLoader<T>;
    position(opts?: PositioningOptions): ComponentLoader<T>;
    provide(provider: Provider): ComponentLoader<T>;
    show(opts?: {
        content?: string | TemplateRef<any>;
        context?: any;
        initialState?: any;
        [key: string]: any;
    }): ComponentRef<T>;
    hide(): ComponentLoader<T>;
    toggle(): void;
    dispose(): void;
    listen(listenOpts: ListenOptions): ComponentLoader<T>;
    _removeGlobalListener(): void;
    attachInline(vRef: ViewContainerRef, template: TemplateRef<any>): ComponentLoader<T>;
    _registerOutsideClick(): void;
    getInnerComponent(): ComponentRef<T>;
    private _subscribePositioning();
    private _unsubscribePositioning();
    private _getContentRef(content, context?, initialState?);
}
