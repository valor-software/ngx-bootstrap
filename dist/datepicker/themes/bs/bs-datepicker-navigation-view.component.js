import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BsNavigationDirection } from '../../models/index';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
var BsDatepickerNavigationViewComponent = (function () {
    function BsDatepickerNavigationViewComponent(_config) {
        this._config = _config;
        this.onNavigate = new EventEmitter();
        this.onViewMode = new EventEmitter();
        this.config = _config;
    }
    BsDatepickerNavigationViewComponent.prototype.navTo = function (down) {
        this.onNavigate.emit(down ? BsNavigationDirection.DOWN : BsNavigationDirection.UP);
    };
    BsDatepickerNavigationViewComponent.prototype.view = function (viewMode) {
        if (viewMode != 'year' || !this.config.disableYearView) {
            if (viewMode != 'month' || !this.config.disableMonthView) {
                this.onViewMode.emit(viewMode);
            }
        }
    };
    BsDatepickerNavigationViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bs-datepicker-navigation-view',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <button class=\"previous\"\n            [disabled]=\"calendar.disableLeftArrow\"\n            [style.visibility]=\"calendar.hideLeftArrow ? 'hidden' : 'visible'\"\n            (click)=\"navTo(true)\"><span>&lsaquo;</span>\n    </button>\n\n    <button class=\"current\"\n            *ngIf=\"calendar.monthTitle && !config.disableMonthView\"\n            (click)=\"view('month')\"\n    ><span>{{ calendar.monthTitle }}</span>\n    </button>\n    <div class=\"current\"\n            *ngIf=\"calendar.monthTitle && config.disableMonthView\"\n    ><span>{{ calendar.monthTitle }}</span>\n    </div>\n\n    <button class=\"current\" (click)=\"view('year')\" *ngIf=\"!config.disableYearView\"\n    ><span>{{ calendar.yearTitle }}</span></button>\n    <div class=\"current\" *ngIf=\"config.disableYearView\"><span>{{ calendar.yearTitle }}</span></div>\n\n    <button class=\"next\"\n            [disabled]=\"calendar.disableRightArrow\"\n            [style.visibility]=\"calendar.hideRightArrow ? 'hidden' : 'visible'\"\n            (click)=\"navTo(false)\"><span>&rsaquo;</span>\n    </button>\n  "
                },] },
    ];
    /** @nocollapse */
    BsDatepickerNavigationViewComponent.ctorParameters = function () { return [
        { type: BsDatepickerConfig, },
    ]; };
    BsDatepickerNavigationViewComponent.propDecorators = {
        'calendar': [{ type: Input },],
        'onNavigate': [{ type: Output },],
        'onViewMode': [{ type: Output },],
    };
    return BsDatepickerNavigationViewComponent;
}());
export { BsDatepickerNavigationViewComponent };
//# sourceMappingURL=bs-datepicker-navigation-view.component.js.map