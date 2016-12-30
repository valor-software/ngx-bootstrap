"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var carousel_component_1 = require('./carousel.component');
var slide_component_1 = require('./slide.component');
var carousel_config_1 = require('./carousel.config');
var CarouselModule = (function () {
    function CarouselModule() {
    }
    CarouselModule.forRoot = function () {
        return { ngModule: CarouselModule, providers: [] };
    };
    CarouselModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [slide_component_1.SlideComponent, carousel_component_1.CarouselComponent],
                    exports: [slide_component_1.SlideComponent, carousel_component_1.CarouselComponent],
                    providers: [carousel_config_1.CarouselConfig]
                },] },
    ];
    /** @nocollapse */
    CarouselModule.ctorParameters = function () { return []; };
    return CarouselModule;
}());
exports.CarouselModule = CarouselModule;
