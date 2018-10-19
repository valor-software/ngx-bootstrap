import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarComponent } from './bar.component';
import { ProgressbarComponent } from './progressbar.component';
import { ProgressbarConfig } from './progressbar.config';
var ProgressbarModule = (function () {
    function ProgressbarModule() {
    }
    ProgressbarModule.forRoot = function () {
        return { ngModule: ProgressbarModule, providers: [ProgressbarConfig] };
    };
    ProgressbarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [BarComponent, ProgressbarComponent],
                    exports: [BarComponent, ProgressbarComponent]
                },] },
    ];
    /** @nocollapse */
    ProgressbarModule.ctorParameters = function () { return []; };
    return ProgressbarModule;
}());
export { ProgressbarModule };
//# sourceMappingURL=progressbar.module.js.map