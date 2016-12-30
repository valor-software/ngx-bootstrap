"use strict";
var core_1 = require('@angular/core');
var dropdown_menu_directive_1 = require('./dropdown-menu.directive');
var dropdown_toggle_directive_1 = require('./dropdown-toggle.directive');
var dropdown_directive_1 = require('./dropdown.directive');
var dropdown_config_1 = require('./dropdown.config');
var DropdownModule = (function () {
    function DropdownModule() {
    }
    DropdownModule.forRoot = function () {
        return { ngModule: DropdownModule, providers: [dropdown_config_1.DropdownConfig] };
    };
    DropdownModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [dropdown_directive_1.DropdownDirective, dropdown_menu_directive_1.DropdownMenuDirective, dropdown_toggle_directive_1.DropdownToggleDirective],
                    exports: [dropdown_directive_1.DropdownDirective, dropdown_menu_directive_1.DropdownMenuDirective, dropdown_toggle_directive_1.DropdownToggleDirective]
                },] },
    ];
    /** @nocollapse */
    DropdownModule.ctorParameters = function () { return []; };
    return DropdownModule;
}());
exports.DropdownModule = DropdownModule;
