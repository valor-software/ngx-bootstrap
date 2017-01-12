"use strict";
var core_1 = require('@angular/core');
// todo: progress element conflict with bootstrap.css
// todo: need hack: replace host element with div
var ProgressDirective = (function () {
    function ProgressDirective() {
        this.addClass = true;
        this.bars = [];
        this._max = 100;
    }
    Object.defineProperty(ProgressDirective.prototype, "max", {
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
    ProgressDirective.prototype.addBar = function (bar) {
        if (!this.animate) {
            bar.transition = 'none';
        }
        this.bars.push(bar);
    };
    ProgressDirective.prototype.removeBar = function (bar) {
        this.bars.splice(this.bars.indexOf(bar), 1);
    };
    ProgressDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: 'bs-progress, [progress]' },] },
    ];
    /** @nocollapse */
    ProgressDirective.ctorParameters = function () { return []; };
    ProgressDirective.propDecorators = {
        'animate': [{ type: core_1.Input },],
        'max': [{ type: core_1.HostBinding, args: ['attr.max',] }, { type: core_1.Input },],
        'addClass': [{ type: core_1.HostBinding, args: ['class.progress',] },],
    };
    return ProgressDirective;
}());
exports.ProgressDirective = ProgressDirective;
