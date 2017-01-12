"use strict";
var core_1 = require('@angular/core');
var popover_config_1 = require('./popover-config');
var component_loader_1 = require('../component-loader');
var popover_container_component_1 = require('./popover-container.component');
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
var PopoverDirective = (function () {
    function PopoverDirective(_elementRef, _renderer, _viewContainerRef, _config, cis) {
        this._popover = cis
            .createLoader(_elementRef, _viewContainerRef, _renderer)
            .provide({ provide: popover_config_1.PopoverConfig, useValue: _config });
        Object.assign(this, _config);
        this.onShown = this._popover.onShown;
        this.onHidden = this._popover.onHidden;
    }
    Object.defineProperty(PopoverDirective.prototype, "isOpen", {
        /**
         * Returns whether or not the popover is currently being shown
         */
        get: function () { return this._popover.isShown; },
        set: function (value) {
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    PopoverDirective.prototype.show = function () {
        if (this._popover.isShown) {
            return;
        }
        this._popover
            .attach(popover_container_component_1.PopoverContainerComponent)
            .to(this.container)
            .position({ attachment: this.placement })
            .show({
            content: this.popover,
            placement: this.placement,
            title: this.popoverTitle
        });
    };
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    PopoverDirective.prototype.hide = function () {
        if (this.isOpen) {
            this._popover.hide();
        }
    };
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    PopoverDirective.prototype.toggle = function () {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    };
    PopoverDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._popover.listen({
            triggers: this.triggers,
            show: function () { return _this.show(); }
        });
    };
    PopoverDirective.prototype.ngOnDestroy = function () {
        this._popover.dispose();
    };
    PopoverDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[popover]', exportAs: 'bs-popover' },] },
    ];
    /** @nocollapse */
    PopoverDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
        { type: core_1.ViewContainerRef, },
        { type: popover_config_1.PopoverConfig, },
        { type: component_loader_1.ComponentLoaderFactory, },
    ]; };
    PopoverDirective.propDecorators = {
        'popover': [{ type: core_1.Input },],
        'popoverTitle': [{ type: core_1.Input },],
        'placement': [{ type: core_1.Input },],
        'triggers': [{ type: core_1.Input },],
        'container': [{ type: core_1.Input },],
        'isOpen': [{ type: core_1.Input },],
        'onShown': [{ type: core_1.Output },],
        'onHidden': [{ type: core_1.Output },],
    };
    return PopoverDirective;
}());
exports.PopoverDirective = PopoverDirective;
