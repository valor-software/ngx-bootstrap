"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var pagination_config_1 = require('./pagination.config');
var pager_component_1 = require('./pager.component');
var pagination_component_1 = require('./pagination.component');
var PaginationModule = (function () {
    function PaginationModule() {
    }
    PaginationModule.forRoot = function () {
        return { ngModule: PaginationModule, providers: [pagination_config_1.PaginationConfig] };
    };
    PaginationModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [pager_component_1.PagerComponent, pagination_component_1.PaginationComponent],
                    exports: [pager_component_1.PagerComponent, pagination_component_1.PaginationComponent]
                },] },
    ];
    /** @nocollapse */
    PaginationModule.ctorParameters = function () { return []; };
    return PaginationModule;
}());
exports.PaginationModule = PaginationModule;
