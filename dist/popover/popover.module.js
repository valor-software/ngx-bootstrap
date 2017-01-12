"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var popover_config_1 = require('./popover-config');
var component_loader_1 = require('../component-loader');
var positioning_1 = require('../positioning');
var popover_directive_1 = require('./popover.directive');
var popover_container_component_1 = require('./popover-container.component');
var PopoverModule = (function () {
    function PopoverModule() {
    }
    PopoverModule.forRoot = function () {
        return {
            ngModule: PopoverModule,
            providers: [popover_config_1.PopoverConfig, component_loader_1.ComponentLoaderFactory, positioning_1.PositioningService]
        };
    };
    PopoverModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [popover_directive_1.PopoverDirective, popover_container_component_1.PopoverContainerComponent],
                    exports: [popover_directive_1.PopoverDirective],
                    entryComponents: [popover_container_component_1.PopoverContainerComponent]
                },] },
    ];
    /** @nocollapse */
    PopoverModule.ctorParameters = function () { return []; };
    return PopoverModule;
}());
exports.PopoverModule = PopoverModule;
