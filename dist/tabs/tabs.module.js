"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var ng_transclude_directive_1 = require('./ng-transclude.directive');
var tab_heading_directive_1 = require('./tab-heading.directive');
var tab_directive_1 = require('./tab.directive');
var tabset_component_1 = require('./tabset.component');
var tabset_config_1 = require('./tabset.config');
var TabsModule = (function () {
    function TabsModule() {
    }
    TabsModule.forRoot = function () {
        return {
            ngModule: TabsModule,
            providers: [tabset_config_1.TabsetConfig]
        };
    };
    TabsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [ng_transclude_directive_1.NgTranscludeDirective, tab_directive_1.TabDirective, tabset_component_1.TabsetComponent, tab_heading_directive_1.TabHeadingDirective],
                    exports: [tab_directive_1.TabDirective, tabset_component_1.TabsetComponent, tab_heading_directive_1.TabHeadingDirective, ng_transclude_directive_1.NgTranscludeDirective]
                },] },
    ];
    /** @nocollapse */
    TabsModule.ctorParameters = function () { return []; };
    return TabsModule;
}());
exports.TabsModule = TabsModule;
