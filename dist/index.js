"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/* tslint:disable: max-classes-per-file */
var core_1 = require('@angular/core');
var accordion_module_1 = require('./accordion/accordion.module');
var alert_module_1 = require('./alert/alert.module');
var buttons_module_1 = require('./buttons/buttons.module');
var carousel_module_1 = require('./carousel/carousel.module');
var collapse_module_1 = require('./collapse/collapse.module');
var datepicker_module_1 = require('./datepicker/datepicker.module');
var dropdown_module_1 = require('./dropdown/dropdown.module');
var modal_module_1 = require('./modal/modal.module');
var pagination_module_1 = require('./pagination/pagination.module');
var progressbar_module_1 = require('./progressbar/progressbar.module');
var rating_module_1 = require('./rating/rating.module');
var tabs_module_1 = require('./tabs/tabs.module');
var timepicker_module_1 = require('./timepicker/timepicker.module');
var tooltip_module_1 = require('./tooltip/tooltip.module');
var typeahead_module_1 = require('./typeahead/typeahead.module');
var popover_module_1 = require('./popover/popover.module');
var MODULES = [
    accordion_module_1.AccordionModule, alert_module_1.AlertModule, buttons_module_1.ButtonsModule,
    carousel_module_1.CarouselModule, collapse_module_1.CollapseModule, datepicker_module_1.DatepickerModule,
    dropdown_module_1.DropdownModule, modal_module_1.ModalModule, pagination_module_1.PaginationModule,
    progressbar_module_1.ProgressbarModule, popover_module_1.PopoverModule, rating_module_1.RatingModule,
    tabs_module_1.TabsModule, timepicker_module_1.TimepickerModule, tooltip_module_1.TooltipModule,
    typeahead_module_1.TypeaheadModule
];
var BsRootModule = (function () {
    function BsRootModule() {
    }
    BsRootModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        accordion_module_1.AccordionModule.forRoot(), alert_module_1.AlertModule.forRoot(), buttons_module_1.ButtonsModule.forRoot(),
                        carousel_module_1.CarouselModule.forRoot(), collapse_module_1.CollapseModule.forRoot(), datepicker_module_1.DatepickerModule.forRoot(),
                        dropdown_module_1.DropdownModule.forRoot(), modal_module_1.ModalModule.forRoot(), pagination_module_1.PaginationModule.forRoot(),
                        progressbar_module_1.ProgressbarModule.forRoot(), popover_module_1.PopoverModule.forRoot(), rating_module_1.RatingModule.forRoot(),
                        tabs_module_1.TabsModule.forRoot(), timepicker_module_1.TimepickerModule.forRoot(), tooltip_module_1.TooltipModule.forRoot(),
                        typeahead_module_1.TypeaheadModule.forRoot()
                    ],
                    exports: MODULES
                },] },
    ];
    /** @nocollapse */
    BsRootModule.ctorParameters = function () { return []; };
    return BsRootModule;
}());
exports.BsRootModule = BsRootModule;
var Ng2BootstrapModule = (function () {
    function Ng2BootstrapModule() {
    }
    Ng2BootstrapModule.forRoot = function () {
        return { ngModule: BsRootModule };
    };
    Ng2BootstrapModule.decorators = [
        { type: core_1.NgModule, args: [{ exports: MODULES },] },
    ];
    /** @nocollapse */
    Ng2BootstrapModule.ctorParameters = function () { return []; };
    return Ng2BootstrapModule;
}());
exports.Ng2BootstrapModule = Ng2BootstrapModule;
__export(require('./accordion'));
__export(require('./alert'));
__export(require('./buttons'));
__export(require('./carousel'));
__export(require('./collapse'));
__export(require('./datepicker'));
__export(require('./modal'));
__export(require('./dropdown'));
__export(require('./pagination'));
__export(require('./progressbar'));
__export(require('./rating'));
__export(require('./tabs'));
__export(require('./timepicker'));
__export(require('./tooltip'));
__export(require('./typeahead'));
__export(require('./popover'));
__export(require('./utils/ng2-bootstrap-config'));
__export(require('./utils/decorators'));
