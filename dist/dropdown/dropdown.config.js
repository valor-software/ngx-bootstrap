"use strict";
var dropdown_service_1 = require('./dropdown.service');
var core_1 = require('@angular/core');
/** Default dropdown configuration */
var DropdownConfig = (function () {
    function DropdownConfig() {
        /** default dropdown auto closing behavior */
        this.autoClose = dropdown_service_1.NONINPUT;
        /** is keyboard navigation enabled by default */
        this.keyboardNav = false;
    }
    DropdownConfig.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DropdownConfig.ctorParameters = function () { return []; };
    return DropdownConfig;
}());
exports.DropdownConfig = DropdownConfig;
