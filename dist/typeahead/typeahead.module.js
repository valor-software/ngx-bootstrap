"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var typeahead_container_component_1 = require('./typeahead-container.component');
var typeahead_directive_1 = require('./typeahead.directive');
var component_loader_1 = require('../component-loader');
var positioning_1 = require('../positioning');
var TypeaheadModule = (function () {
    function TypeaheadModule() {
    }
    TypeaheadModule.forRoot = function () {
        return {
            ngModule: TypeaheadModule,
            providers: [component_loader_1.ComponentLoaderFactory, positioning_1.PositioningService]
        };
    };
    ;
    TypeaheadModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [typeahead_container_component_1.TypeaheadContainerComponent, typeahead_directive_1.TypeaheadDirective],
                    exports: [typeahead_container_component_1.TypeaheadContainerComponent, typeahead_directive_1.TypeaheadDirective],
                    entryComponents: [typeahead_container_component_1.TypeaheadContainerComponent]
                },] },
    ];
    /** @nocollapse */
    TypeaheadModule.ctorParameters = function () { return []; };
    return TypeaheadModule;
}());
exports.TypeaheadModule = TypeaheadModule;
