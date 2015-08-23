/// <reference path="../../tsd.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var progressConfig = {
    animate: true,
    max: 100
};
// todo: progress element conflict with bootstrap.css
// todo: need hack: replace host element with div
var Progress = (function () {
    function Progress() {
        this.bars = [];
    }
    Progress.prototype.onInit = function () {
        this.animate = this.animate !== false;
        this.max = typeof this.max === 'number' ? this.max : progressConfig.max;
    };
    Object.defineProperty(Progress.prototype, "max", {
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
    Progress.prototype.addBar = function (bar) {
        if (!this.animate) {
            bar.transition = 'none';
        }
        this.bars.push(bar);
    };
    Progress.prototype.removeBar = function (bar) {
        this.bars.splice(this.bars.indexOf(bar), 1);
    };
    Progress = __decorate([
        angular2_1.Directive({
            selector: 'bs-progress, [progress]',
            properties: ['animate', 'max'],
            host: {
                'class': 'progress'
            },
            lifecycle: [angular2_1.LifecycleEvent.onInit]
        })
    ], Progress);
    return Progress;
})();
exports.Progress = Progress;
// todo: number pipe
// todo: use query from progress?
var Bar = (function () {
    function Bar(progress) {
        this.progress = progress;
        this.percent = 0;
    }
    Bar.prototype.onInit = function () {
        this.progress.addBar(this);
    };
    Bar.prototype.onDestroy = function () {
        this.progress.removeBar(this);
    };
    Object.defineProperty(Bar.prototype, "value", {
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
    Bar.prototype.recalculatePercentage = function () {
        this.percent = +(100 * this.value / this.progress.max).toFixed(2);
        var totalPercentage = this.progress.bars.reduce(function (total, bar) {
            return total + bar.percent;
        }, 0);
        if (totalPercentage > 100) {
            this.percent -= totalPercentage - 100;
        }
    };
    Bar = __decorate([
        angular2_1.Component({
            selector: 'bar, [bar]',
            properties: [
                'type', 'value'
            ],
            lifecycle: [angular2_1.LifecycleEvent.onInit, angular2_1.LifecycleEvent.onDestroy]
        }),
        angular2_1.View({
            template: "\n  <div class=\"progress-bar\"\n    style=\"min-width: 0;\"\n    role=\"progressbar\"\n    [ng-class]=\"type && 'progress-bar-' + type\"\n    [ng-style]=\"{width: (percent < 100 ? percent : 100) + '%', transition: transition}\"\n    aria-valuemin=\"0\"\n    [attr.aria-valuenow]=\"value\"\n    [attr.aria-valuetext]=\"percent.toFixed(0) + '%'\"\n    [attr.aria-valuemax]=\"max\"\n    ><ng-content></ng-content></div>\n",
            directives: [angular2_1.NgStyle, angular2_1.NgClass],
            encapsulation: angular2_1.ViewEncapsulation.NONE
        }),
        __param(0, angular2_1.Host())
    ], Bar);
    return Bar;
})();
exports.Bar = Bar;
var Progressbar = (function () {
    function Progressbar() {
    }
    Progressbar = __decorate([
        angular2_1.Component({
            selector: 'progressbar, [progressbar]',
            properties: ['animate', 'max', 'type', 'value']
        }),
        angular2_1.View({
            template: "\n    <div progress [animate]=\"animate\" [max]=\"max\">\n      <bar [type]=\"type\" [value]=\"value\">\n          <ng-content></ng-content>\n      </bar>\n    </div>\n  ",
            directives: [Progress, Bar]
        })
    ], Progressbar);
    return Progressbar;
})();
exports.Progressbar = Progressbar;
exports.progressbar = [Progress, Bar, Progressbar];
