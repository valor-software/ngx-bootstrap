"use strict";
var core_1 = require('@angular/core');
var modal_backdrop_component_1 = require('./modal-backdrop.component');
var modal_component_1 = require('./modal.component');
var positioning_1 = require('../positioning');
var component_loader_1 = require('../component-loader');
var ModalModule = (function () {
    function ModalModule() {
    }
    ModalModule.forRoot = function () {
        return { ngModule: ModalModule, providers: [component_loader_1.ComponentLoaderFactory, positioning_1.PositioningService] };
    };
    ModalModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [modal_backdrop_component_1.ModalBackdropComponent, modal_component_1.ModalDirective],
                    exports: [modal_backdrop_component_1.ModalBackdropComponent, modal_component_1.ModalDirective],
                    entryComponents: [modal_backdrop_component_1.ModalBackdropComponent]
                },] },
    ];
    /** @nocollapse */
    ModalModule.ctorParameters = function () { return []; };
    return ModalModule;
}());
exports.ModalModule = ModalModule;
