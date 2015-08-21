/// <reference path="../../tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
// TODO: templateUrl
var Rating = (function (_super) {
    __extends(Rating, _super);
    function Rating(cd, renderer, elementRef) {
        _super.call(this, cd, renderer, elementRef);
        this.onHover = new angular2_1.EventEmitter();
        this.onLeave = new angular2_1.EventEmitter();
    }
    Rating.prototype.onInit = function () {
        this.max = typeof this.max !== 'undefined' ? this.max : 5;
        this.readonly = this.readonly === true;
        this.stateOn = typeof this.stateOn !== 'undefined' ? this.stateOn : 'glyphicon-star';
        this.stateOff = typeof this.stateOff !== 'undefined' ? this.stateOff : 'glyphicon-star-empty';
        this.titles = typeof this.titles !== 'undefined' && this.titles.length > 0 ? this.titles : ['one', 'two', 'three', 'four', 'five'];
        this.range = this.buildTemplateObjects(this.ratingStates, this.max);
    };
    // model -> view
    Rating.prototype.writeValue = function (value) {
        if (value % 1 !== value) {
            this.value = Math.round(value);
            this.preValue = value;
            return;
        }
        this.preValue = value;
        this.value = value;
    };
    Rating.prototype.buildTemplateObjects = function (ratingStates, max) {
        ratingStates = ratingStates || [];
        var count = ratingStates.length || max;
        var result = [];
        for (var i = 0; i < count; i++) {
            result.push(Object.assign({
                index: i,
                stateOn: this.stateOn,
                stateOff: this.stateOff,
                title: this.titles[i] || i + 1
            }, ratingStates[i] || {}));
        }
        return result;
    };
    Rating.prototype.rate = function (value) {
        if (!this.readonly && value >= 0 && value <= this.range.length) {
            this.writeValue(value);
            this.cd.viewToModelUpdate(value);
        }
    };
    Rating.prototype.enter = function (value) {
        if (!this.readonly) {
            this.value = value;
            this.onHover.next(value);
        }
    };
    Rating.prototype.reset = function () {
        console.log('this.preValue', this.preValue);
        this.value = this.preValue;
        this.onLeave.next(null);
    };
    Rating.prototype.onKeydown = function (event) {
        if ([37, 38, 39, 40].indexOf(event.which) === -1) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        var sign = event.which === 38 || event.which === 39 ? 1 : -1;
        this.rate(this.value + sign);
    };
    Rating = __decorate([
        angular2_1.Component({
            selector: 'rating',
            properties: [
                'max', 'readonly', 'titles',
                'stateOn', 'stateOff',
                'ratingStates'
            ],
            events: ['onHover', 'onLeave'],
            host: {
                '(keydown)': 'onKeydown($event)'
            },
            lifecycle: [angular2_1.LifecycleEvent.onInit]
        }),
        angular2_1.View({
            template: "\n    <span (mouseleave)=\"reset()\" (keydown)=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"range.length\" [attr.aria-valuenow]=\"value\">\n      <template ng-for #r [ng-for-of]=\"range\" #index=\"index\">\n        <span class=\"sr-only\">({{ index < value ? '*' : ' ' }})</span>\n        <i (mouseenter)=\"enter(index + 1)\" (click)=\"rate(index + 1)\" class=\"glyphicon\" [ng-class]=\"index < value ? r.stateOn : r.stateOff\" [title]=\"r.title\" ></i>\n      </template>\n    </span>\n  ",
            directives: [angular2_1.NgClass, angular2_1.NgFor]
        }),
        __param(0, angular2_1.Self())
    ], Rating);
    return Rating;
})(angular2_1.DefaultValueAccessor);
exports.Rating = Rating;
