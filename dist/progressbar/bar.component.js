import { Component, Host, HostBinding, Input } from '@angular/core';
import { ProgressbarComponent } from './progressbar.component';
import { isBs3 } from '../utils/theme-provider';
// todo: number pipe
// todo: use query from progress?
var BarComponent = (function () {
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
            return this.percent;
        },
        enumerable: true,
        configurable: true
    });
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
        this.percent = +(this.value / this.progress.max * 100).toFixed(2);
        var totalPercentage = this.progress.bars
            .reduce(function (total, bar) {
            return total + bar.percent;
        }, 0);
        if (totalPercentage > 100) {
            this.percent -= totalPercentage - 100;
        }
    };
    BarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bar',
                    template: "<ng-content></ng-content> ",
                    host: {
                        role: 'progressbar',
                        'aria-valuemin': '0',
                        '[class]': '"progress-bar " + (type ? "progress-bar-" + type + " bg-" + type : "")',
                        '[class.progress-bar-animated]': '!isBs3 && animate',
                        '[class.progress-bar-striped]': 'striped',
                        '[class.active]': 'isBs3 && animate',
                        '[attr.aria-valuenow]': 'value',
                        '[attr.aria-valuetext]': 'percent ? percent.toFixed(0) + "%" : ""',
                        '[attr.aria-valuemax]': 'max',
                        '[style.height.%]': '"100"'
                    }
                },] },
    ];
    /** @nocollapse */
    BarComponent.ctorParameters = function () { return [
        { type: ProgressbarComponent, decorators: [{ type: Host },] },
    ]; };
    BarComponent.propDecorators = {
        'type': [{ type: Input },],
        'value': [{ type: Input },],
        'setBarWidth': [{ type: HostBinding, args: ['style.width.%',] },],
    };
    return BarComponent;
}());
export { BarComponent };
//# sourceMappingURL=bar.component.js.map