"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var bar_component_1 = require('./bar.component');
var progress_directive_1 = require('./progress.directive');
var progressbar_component_1 = require('./progressbar.component');
var progressbar_config_1 = require('./progressbar.config');
var ProgressbarModule = (function () {
    function ProgressbarModule() {
    }
    ProgressbarModule.forRoot = function () {
        return { ngModule: ProgressbarModule, providers: [progressbar_config_1.ProgressbarConfig] };
    };
    ProgressbarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [progress_directive_1.ProgressDirective, bar_component_1.BarComponent, progressbar_component_1.ProgressbarComponent],
                    exports: [progress_directive_1.ProgressDirective, bar_component_1.BarComponent, progressbar_component_1.ProgressbarComponent]
                },] },
    ];
    /** @nocollapse */
    ProgressbarModule.ctorParameters = function () { return []; };
    return ProgressbarModule;
}());
exports.ProgressbarModule = ProgressbarModule;
