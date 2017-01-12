"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var alert_component_1 = require('./alert.component');
var alert_config_1 = require('./alert.config');
var AlertModule = (function () {
    function AlertModule() {
    }
    AlertModule.forRoot = function () {
        return { ngModule: AlertModule, providers: [alert_config_1.AlertConfig] };
    };
    AlertModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [alert_component_1.AlertComponent],
                    exports: [alert_component_1.AlertComponent],
                    entryComponents: [alert_component_1.AlertComponent]
                },] },
    ];
    /** @nocollapse */
    AlertModule.ctorParameters = function () { return []; };
    return AlertModule;
}());
exports.AlertModule = AlertModule;
