import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
var BsCustomDatesViewComponent = (function () {
    function BsCustomDatesViewComponent() {
    }
    BsCustomDatesViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bs-custom-date-view',
                    template: "\n    <div class=\"bs-datepicker-predefined-btns\">\n      <button *ngFor=\"let range of ranges\">{{ range.label }}</button>\n      <button *ngIf=\"isCustomRangeShown\">Custom Range</button>\n    </div>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    BsCustomDatesViewComponent.ctorParameters = function () { return []; };
    BsCustomDatesViewComponent.propDecorators = {
        'isCustomRangeShown': [{ type: Input },],
        'ranges': [{ type: Input },],
    };
    return BsCustomDatesViewComponent;
}());
export { BsCustomDatesViewComponent };
//# sourceMappingURL=bs-custom-dates-view.component.js.map