import { NgModule } from '@angular/core';
import { CollapseDirective } from './collapse.directive';
export var CollapseModule = (function () {
    function CollapseModule() {
    }
    CollapseModule.forRoot = function () {
        return { ngModule: CollapseModule, providers: [] };
    };
    CollapseModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [CollapseDirective],
                    exports: [CollapseDirective]
                },] },
    ];
    /** @nocollapse */
    CollapseModule.ctorParameters = function () { return []; };
    return CollapseModule;
}());
//# sourceMappingURL=collapse.module.js.map