import { Injectable } from '@angular/core';
var ProgressbarConfig = (function () {
    function ProgressbarConfig() {
        /** if `true` changing value of progress bar will be animated */
        this.animate = false;
        /** maximum total value of progress element */
        this.max = 100;
    }
    ProgressbarConfig.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ProgressbarConfig.ctorParameters = function () { return []; };
    return ProgressbarConfig;
}());
export { ProgressbarConfig };
//# sourceMappingURL=progressbar.config.js.map