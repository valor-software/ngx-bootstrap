"use strict";
var core_1 = require('@angular/core');
var component_loader_class_1 = require('./component-loader.class');
var positioning_1 = require('../positioning');
var ComponentLoaderFactory = (function () {
    function ComponentLoaderFactory(componentFactoryResolver, ngZone, injector, posService) {
        this._ngZone = ngZone;
        this._injector = injector;
        this._posService = posService;
        this._componentFactoryResolver = componentFactoryResolver;
    }
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     * @returns {ComponentLoader}
     */
    ComponentLoaderFactory.prototype.createLoader = function (_elementRef, _viewContainerRef, _renderer) {
        return new component_loader_class_1.ComponentLoader(_viewContainerRef, _renderer, _elementRef, this._injector, this._componentFactoryResolver, this._ngZone, this._posService);
    };
    ComponentLoaderFactory.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ComponentLoaderFactory.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.NgZone, },
        { type: core_1.Injector, },
        { type: positioning_1.PositioningService, },
    ]; };
    return ComponentLoaderFactory;
}());
exports.ComponentLoaderFactory = ComponentLoaderFactory;
