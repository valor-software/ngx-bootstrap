import { Directive, TemplateRef } from '@angular/core';
import { TabDirective } from './tab.directive';
/** Should be used to mark <ng-template> element as a template for tab heading */
var TabHeadingDirective = (function () {
    function TabHeadingDirective(templateRef, tab) {
        tab.headingRef = templateRef;
    }
    TabHeadingDirective.decorators = [
        { type: Directive, args: [{ selector: '[tabHeading]' },] },
    ];
    /** @nocollapse */
    TabHeadingDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: TabDirective, },
    ]; };
    return TabHeadingDirective;
}());
export { TabHeadingDirective };
//# sourceMappingURL=tab-heading.directive.js.map