"use strict";
var core_1 = require('@angular/core');
var button_checkbox_directive_1 = require('./button-checkbox.directive');
var button_radio_directive_1 = require('./button-radio.directive');
var ButtonsModule = (function () {
    function ButtonsModule() {
    }
    ButtonsModule.forRoot = function () {
        return { ngModule: ButtonsModule, providers: [] };
    };
    ButtonsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [button_checkbox_directive_1.ButtonCheckboxDirective, button_radio_directive_1.ButtonRadioDirective],
                    exports: [button_checkbox_directive_1.ButtonCheckboxDirective, button_radio_directive_1.ButtonRadioDirective]
                },] },
    ];
    /** @nocollapse */
    ButtonsModule.ctorParameters = function () { return []; };
    return ButtonsModule;
}());
exports.ButtonsModule = ButtonsModule;
