import { Injectable } from '@angular/core';
/**
 * For date range picker there are `BsDaterangepickerConfig` which inherits all properties,
 * except `displayMonths`, for range picker it default to `2`
 */
var BsDatepickerConfig = (function () {
    function BsDatepickerConfig() {
        /** CSS class which will be applied to datepicker container,
         * usually used to set color theme
         */
        this.containerClass = 'theme-green';
        // DatepickerRenderOptions
        this.displayMonths = 1;
        /**
         * Allows to hide week numbers in datepicker
         */
        this.showWeekNumbers = true;
        this.dateInputFormat = 'L';
        // range picker
        this.rangeSeparator = ' - ';
        /**
         * Date format for date range input field
         */
        this.rangeInputFormat = 'L';
        // DatepickerFormatOptions
        this.monthTitle = 'MMMM';
        this.yearTitle = 'YYYY';
        this.dayLabel = 'D';
        this.monthLabel = 'MMMM';
        this.yearLabel = 'YYYY';
        this.weekNumbers = 'w';
        this.changeMonthOnClick = false;
        this.disableYearView = false;
        this.disableMonthView = false;
    }
    BsDatepickerConfig.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BsDatepickerConfig.ctorParameters = function () { return []; };
    return BsDatepickerConfig;
}());
export { BsDatepickerConfig };
//# sourceMappingURL=bs-datepicker.config.js.map