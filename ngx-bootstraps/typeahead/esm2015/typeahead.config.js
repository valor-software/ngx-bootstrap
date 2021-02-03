import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/** Default values provider for typeahead */
export class TypeaheadConfig {
    constructor() {
        /** sets use adaptive position */
        this.adaptivePosition = false;
        /** turn on/off animation */
        this.isAnimated = false;
        /** used to hide results on blur */
        this.hideResultsOnBlur = true;
        /** if true, typeahead will cancel async request on blur */
        this.cancelRequestOnFocusLost = false;
        /** used to choose the first item in typeahead container */
        this.selectFirstItem = true;
        /** used to active/inactive the first item in typeahead container */
        this.isFirstItemActive = true;
        /** used to choose set minimal no of characters that needs to
         * be entered before typeahead kicks-in
         */
        this.minLength = 1;
    }
}
TypeaheadConfig.ɵfac = function TypeaheadConfig_Factory(t) { return new (t || TypeaheadConfig)(); };
TypeaheadConfig.ɵprov = i0.ɵɵdefineInjectable({ token: TypeaheadConfig, factory: TypeaheadConfig.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TypeaheadConfig, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=typeahead.config.js.map