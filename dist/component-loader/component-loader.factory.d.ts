import { ApplicationRef, ComponentFactoryResolver, ElementRef, Injector, NgZone, Renderer2, ViewContainerRef } from '@angular/core';
import { ComponentLoader } from './component-loader.class';
import { PositioningService } from '../positioning/index';
export declare class ComponentLoaderFactory {
    private _componentFactoryResolver;
    private _ngZone;
    private _injector;
    private _posService;
    private _applicationRef;
    constructor(_componentFactoryResolver: ComponentFactoryResolver, _ngZone: NgZone, _injector: Injector, _posService: PositioningService, _applicationRef: ApplicationRef);
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     * @returns {ComponentLoader}
     */
    createLoader<T>(_elementRef: ElementRef, _viewContainerRef: ViewContainerRef, _renderer: Renderer2): ComponentLoader<T>;
}
