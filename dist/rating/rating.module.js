"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var rating_component_1 = require('./rating.component');
var RatingModule = (function () {
    function RatingModule() {
    }
    RatingModule.forRoot = function () {
        return {
            ngModule: RatingModule,
            providers: []
        };
    };
    RatingModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [rating_component_1.RatingComponent],
                    exports: [rating_component_1.RatingComponent]
                },] },
    ];
    /** @nocollapse */
    RatingModule.ctorParameters = function () { return []; };
    return RatingModule;
}());
exports.RatingModule = RatingModule;
