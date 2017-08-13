import { Component, Host, HostBinding, Input } from '@angular/core';
import { ProgressDirective } from './progress.directive';
import { isBs3 } from '../utils/ng2-bootstrap-config';
// todo: number pipe
// todo: use query from progress?
export var BarComponent = (function () {
    function BarComponent(progress) {
        this.percent = 0;
        this.progress = progress;
    }
    Object.defineProperty(BarComponent.prototype, "value", {
        /** current value of progress bar */
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (!v && v !== 0) {
                return;
            }
            this._value = v;
            this.recalculatePercentage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarComponent.prototype, "setBarWidth", {
        get: function () {
            this.recalculatePercentage();
            return this.isBs3 ? '' : this.percent;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(BarComponent.prototype, "isBs3", {
        get: function () {
            return isBs3();
        },
        enumerable: true,
        configurable: true
    });
    BarComponent.prototype.ngOnInit = function () {
        this.progress.addBar(this);
    };
    BarComponent.prototype.ngOnDestroy = function () {
        this.progress.removeBar(this);
    };
    BarComponent.prototype.recalculatePercentage = function () {
        this.percent = +(100 * this.value / this.progress.max).toFixed(2);
        var totalPercentage = this.progress.bars.reduce(function (total, bar) {
            return total + bar.percent;
        }, 0);
        if (totalPercentage > 100) {
            this.percent -= totalPercentage - 100;
        }
    };
    BarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bar',
                    template: "\n  <div class=\"progress-bar\"\n    style=\"min-width: 0;\"\n    role=\"progressbar\"\n    [ngClass]=\"type && 'progress-bar-' + type + ' bg-' + type\"\n    [ngStyle]=\"{width: (isBs3 ? (percent < 100 ? percent : 100) + '%' : '100%'), transition: transition}\"\n    aria-valuemin=\"0\"\n    [attr.aria-valuenow]=\"value\"\n    [attr.aria-valuetext]=\"percent.toFixed(0) + '%'\"\n    [attr.aria-valuemax]=\"max\"><ng-content></ng-content></div>\n"
                },] },
    ];
    /** @nocollapse */
    BarComponent.ctorParameters = function () { return [
        { type: ProgressDirective, decorators: [{ type: Host },] },
    ]; };
    BarComponent.propDecorators = {
        'type': [{ type: Input },],
        'value': [{ type: Input },],
        'setBarWidth': [{ type: HostBinding, args: ['style.width.%',] },],
    };
    return BarComponent;
}());
//# sourceMappingURL=bar.component.js.map