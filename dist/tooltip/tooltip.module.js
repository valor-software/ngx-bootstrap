"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var tooltip_container_component_1 = require('./tooltip-container.component');
var tooltip_directive_1 = require('./tooltip.directive');
var tooltip_config_1 = require('./tooltip.config');
var component_loader_1 = require('../component-loader');
var positioning_1 = require('../positioning');
var TooltipModule = (function () {
    function TooltipModule() {
    }
    TooltipModule.forRoot = function () {
        return {
            ngModule: TooltipModule,
            providers: [tooltip_config_1.TooltipConfig, component_loader_1.ComponentLoaderFactory, positioning_1.PositioningService]
        };
    };
    ;
    TooltipModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [tooltip_directive_1.TooltipDirective, tooltip_container_component_1.TooltipContainerComponent],
                    exports: [tooltip_directive_1.TooltipDirective],
                    entryComponents: [tooltip_container_component_1.TooltipContainerComponent]
                },] },
    ];
    /** @nocollapse */
    TooltipModule.ctorParameters = function () { return []; };
    return TooltipModule;
}());
exports.TooltipModule = TooltipModule;
