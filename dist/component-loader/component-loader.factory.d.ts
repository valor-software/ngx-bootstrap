import { NgZone, ViewContainerRef, ComponentFactoryResolver, Injector, Renderer, ElementRef } from '@angular/core';
import { ComponentLoader } from './component-loader.class';
import { PositioningService } from '../positioning';
export declare class ComponentLoaderFactory {
    private _componentFactoryResolver;
    private _ngZone;
    private _injector;
    private _posService;
    constructor(componentFactoryResolver: ComponentFactoryResolver, ngZone: NgZone, injector: Injector, posService: PositioningService);
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     * @returns {ComponentLoader}
     */
    createLoader<T>(_elementRef: ElementRef, _viewContainerRef: ViewContainerRef, _renderer: Renderer): ComponentLoader<T>;
}
