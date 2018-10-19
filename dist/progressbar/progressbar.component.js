import { Component, HostBinding, Input } from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';
import { isBs3 } from '../utils/index';
var ProgressbarComponent = (function () {
    function ProgressbarComponent(config) {
        this.isStacked = false;
        this.addClass = true;
        this.bars = [];
        this._max = 100;
        Object.assign(this, config);
    }
    Object.defineProperty(ProgressbarComponent.prototype, "value", {
        /** current value of progress bar. Could be a number or array of objects
         * like {"value":15,"type":"info","label":"15 %"}
         */
        set: function (value) {
            this.isStacked = Array.isArray(value);
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressbarComponent.prototype, "isBs3", {
        get: function () {
            return isBs3();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressbarComponent.prototype, "max", {
        /** maximum total value of progress element */
        get: function () {
            return this._max;
        },
        set: function (v) {
            this._max = v;
            this.bars.forEach(function (bar) {
                bar.recalculatePercentage();
            });
        },
        enumerable: true,
        configurable: true
    });
    ProgressbarComponent.prototype.addBar = function (bar) {
        bar.animate = this.animate;
        bar.striped = this.striped;
        this.bars.push(bar);
    };
    ProgressbarComponent.prototype.removeBar = function (bar) {
        this.bars.splice(this.bars.indexOf(bar), 1);
    };
    ProgressbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'progressbar',
                    template: "<bar [type]=\"type\" [value]=\"_value\" *ngIf=\"!isStacked\"> <ng-content></ng-content> </bar> <ng-template [ngIf]=\"isStacked\"> <bar *ngFor=\"let item of _value\" [type]=\"item.type\" [value]=\"item.value\">{{ item.label }}</bar> </ng-template> ",
                    styles: [
                        "\n    :host {\n      width: 100%;\n      display: flex;\n    }\n  "
                    ]
                },] },
    ];
    /** @nocollapse */
    ProgressbarComponent.ctorParameters = function () { return [
        { type: ProgressbarConfig, },
    ]; };
    ProgressbarComponent.propDecorators = {
        'animate': [{ type: Input },],
        'striped': [{ type: Input },],
        'type': [{ type: Input },],
        'value': [{ type: Input },],
        'max': [{ type: HostBinding, args: ['attr.max',] }, { type: Input },],
        'addClass': [{ type: HostBinding, args: ['class.progress',] },],
    };
    return ProgressbarComponent;
}());
export { ProgressbarComponent };
//# sourceMappingURL=progressbar.component.js.map