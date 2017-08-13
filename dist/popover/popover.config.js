import { Injectable } from '@angular/core';
/**
 * Configuration service for the Popover directive.
 * You can inject this service, typically in your root component, and customize
 * the values of its properties in order to provide default values for all the
 * popovers used in the application.
 */
export var PopoverConfig = (function () {
    function PopoverConfig() {
        /**
         * Placement of a popover. Accepts: "top", "bottom", "left", "right"
         */
        this.placement = 'top';
        /**
         * Specifies events that should trigger. Supports a space separated list of
         * event names.
         */
        this.triggers = 'click';
    }
    PopoverConfig.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PopoverConfig.ctorParameters = function () { return []; };
    return PopoverConfig;
}());
//# sourceMappingURL=popover.config.js.map