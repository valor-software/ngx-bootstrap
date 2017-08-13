import { Component, EventEmitter, HostListener, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var RATING_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RatingComponent; }),
    multi: true
};
export var RatingComponent = (function () {
    function RatingComponent() {
        /** number of icons */
        this.max = 5;
        /** fired when icon selected, $event:number equals to selected rating */
        this.onHover = new EventEmitter();
        /** fired when icon selected, $event:number equals to previous rating value */
        this.onLeave = new EventEmitter();
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    RatingComponent.prototype.onKeydown = function (event) {
        if ([37, 38, 39, 40].indexOf(event.which) === -1) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        var sign = event.which === 38 || event.which === 39 ? 1 : -1;
        this.rate(this.value + sign);
    };
    RatingComponent.prototype.ngOnInit = function () {
        this.max = typeof this.max !== 'undefined' ? this.max : 5;
        this.readonly = this.readonly === true;
        this.stateOn = typeof this.stateOn !== 'undefined'
            ? this.stateOn
            : 'glyphicon-star';
        this.stateOff = typeof this.stateOff !== 'undefined'
            ? this.stateOff
            : 'glyphicon-star-empty';
        this.titles = typeof this.titles !== 'undefined' && this.titles.length > 0
            ? this.titles
            : ['one', 'two', 'three', 'four', 'five'];
        this.range = this.buildTemplateObjects(this.ratingStates, this.max);
    };
    // model -> view
    RatingComponent.prototype.writeValue = function (value) {
        if (value % 1 !== value) {
            this.value = Math.round(value);
            this.preValue = value;
            return;
        }
        this.preValue = value;
        this.value = value;
    };
    RatingComponent.prototype.enter = function (value) {
        if (!this.readonly) {
            this.value = value;
            this.onHover.emit(value);
        }
    };
    RatingComponent.prototype.reset = function () {
        this.value = this.preValue;
        this.onLeave.emit(this.value);
    };
    RatingComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    RatingComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    RatingComponent.prototype.rate = function (value) {
        if (!this.readonly && value >= 0 && value <= this.range.length) {
            this.writeValue(value);
            this.onChange(value);
        }
    };
    RatingComponent.prototype.buildTemplateObjects = function (ratingStates, max) {
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
    RatingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rating',
                    template: "\n    <span (mouseleave)=\"reset()\" (keydown)=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"range.length\" [attr.aria-valuenow]=\"value\">\n      <template ngFor let-r [ngForOf]=\"range\" let-index=\"index\">\n        <span class=\"sr-only\">({{ index < value ? '*' : ' ' }})</span>\n        <i (mouseenter)=\"enter(index + 1)\" (click)=\"rate(index + 1)\" class=\"glyphicon\" [ngClass]=\"index < value ? r.stateOn : r.stateOff\" [title]=\"r.title\" ></i>\n      </template>\n    </span>\n  ",
                    providers: [RATING_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    RatingComponent.ctorParameters = function () { return []; };
    RatingComponent.propDecorators = {
        'max': [{ type: Input },],
        'stateOn': [{ type: Input },],
        'stateOff': [{ type: Input },],
        'readonly': [{ type: Input },],
        'titles': [{ type: Input },],
        'ratingStates': [{ type: Input },],
        'onHover': [{ type: Output },],
        'onLeave': [{ type: Output },],
        'onKeydown': [{ type: HostListener, args: ['keydown', ['$event'],] },],
    };
    return RatingComponent;
}());
//# sourceMappingURL=rating.component.js.map