import { Component, Input } from '@angular/core';
var BsCurrentDateViewComponent = (function () {
    function BsCurrentDateViewComponent() {
    }
    BsCurrentDateViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bs-current-date',
                    template: "<div class=\"current-timedate\"><span>{{ title }}</span></div>"
                },] },
    ];
    /** @nocollapse */
    BsCurrentDateViewComponent.ctorParameters = function () { return []; };
    BsCurrentDateViewComponent.propDecorators = {
        'title': [{ type: Input },],
    };
    return BsCurrentDateViewComponent;
}());
export { BsCurrentDateViewComponent };
//# sourceMappingURL=bs-current-date-view.component.js.map