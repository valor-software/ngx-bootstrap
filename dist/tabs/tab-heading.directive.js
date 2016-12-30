"use strict";
var core_1 = require('@angular/core');
var tab_directive_1 = require('./tab.directive');
/** Should be used to mark <template> element as a template for tab heading */
var TabHeadingDirective = (function () {
    function TabHeadingDirective(templateRef, tab) {
        tab.headingRef = templateRef;
    }
    TabHeadingDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[tabHeading]' },] },
    ];
    /** @nocollapse */
    TabHeadingDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
        { type: tab_directive_1.TabDirective, },
    ]; };
    return TabHeadingDirective;
}());
exports.TabHeadingDirective = TabHeadingDirective;
