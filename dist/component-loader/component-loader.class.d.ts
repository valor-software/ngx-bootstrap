import { ElementRef, ComponentRef, Type, TemplateRef, EventEmitter, Provider } from '@angular/core';
import { PositioningOptions } from '../positioning';
export interface ListenOptions {
    target?: ElementRef;
    triggers?: string;
    show?: Function;
    hide?: Function;
    toggle?: Function;
}
export declare class ComponentLoader<T> {
    onBeforeShow: EventEmitter<any>;
    onShown: EventEmitter<any>;
    onBeforeHide: EventEmitter<any>;
    onHidden: EventEmitter<any>;
    instance: T;
    _componentRef: ComponentRef<T>;
    private _providers;
    private _componentFactory;
    private _elementRef;
    private _zoneSubscription;
    private _contentRef;
    private _viewContainerRef;
    private _injector;
    private _renderer;
    private _ngZone;
    private _componentFactoryResolver;
    private _posService;
    private _unregisterListenersFn;
    readonly isShown: boolean;
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
    attach(compType: Type<T>): ComponentLoader<T>;
    to(container?: string): ComponentLoader<T>;
    position(opts?: PositioningOptions): ComponentLoader<T>;
    provide(provider: Provider): ComponentLoader<T>;
    show(opts?: {
        content?: string | TemplateRef<any>;
        [key: string]: any;
    }): ComponentRef<T>;
    hide(): ComponentLoader<T>;
    toggle(): void;
    dispose(): void;
    listen(listenOpts: ListenOptions): ComponentLoader<T>;
    private _subscribePositioning();
    private _unsubscribePositioning();
    private _getContentRef(content);
}
