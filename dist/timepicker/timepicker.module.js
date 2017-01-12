"use strict";
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var core_1 = require('@angular/core');
var timepicker_component_1 = require('./timepicker.component');
var timepicker_config_1 = require('./timepicker.config');
var TimepickerModule = (function () {
    function TimepickerModule() {
    }
    TimepickerModule.forRoot = function () {
        return {
            ngModule: TimepickerModule,
            providers: [timepicker_config_1.TimepickerConfig]
        };
    };
    TimepickerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [timepicker_component_1.TimepickerComponent],
                    exports: [timepicker_component_1.TimepickerComponent, forms_1.FormsModule]
                },] },
    ];
    /** @nocollapse */
    TimepickerModule.ctorParameters = function () { return []; };
    return TimepickerModule;
}());
exports.TimepickerModule = TimepickerModule;
