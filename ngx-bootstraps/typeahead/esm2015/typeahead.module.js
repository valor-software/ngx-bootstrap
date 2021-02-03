import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadDirective } from './typeahead.directive';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import * as i0 from "@angular/core";
export class TypeaheadModule {
    static forRoot() {
        return {
            ngModule: TypeaheadModule,
            providers: [ComponentLoaderFactory, PositioningService]
        };
    }
}
TypeaheadModule.ɵmod = i0.ɵɵdefineNgModule({ type: TypeaheadModule });
TypeaheadModule.ɵinj = i0.ɵɵdefineInjector({ factory: function TypeaheadModule_Factory(t) { return new (t || TypeaheadModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TypeaheadModule, { declarations: [TypeaheadContainerComponent, TypeaheadDirective], imports: [CommonModule], exports: [TypeaheadContainerComponent, TypeaheadDirective] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TypeaheadModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [TypeaheadContainerComponent, TypeaheadDirective],
                exports: [TypeaheadContainerComponent, TypeaheadDirective],
                entryComponents: [TypeaheadContainerComponent]
            }]
    }], null, null); })();
//# sourceMappingURL=typeahead.module.js.map