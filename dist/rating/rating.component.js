import { Component, EventEmitter, HostListener, Input, Output, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var RATING_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: forwardRef(function () { return RatingComponent; }),
    multi: true
};
var RatingComponent = (function () {
    function RatingComponent(changeDetection) {
        this.changeDetection = changeDetection;
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
        this.titles =
            typeof this.titles !== 'undefined' && this.titles.length > 0
                ? this.titles
                : ['one', 'two', 'three', 'four', 'five'];
        this.range = this.buildTemplateObjects(this.max);
    };
    // model -> view
    RatingComponent.prototype.writeValue = function (value) {
        if (value % 1 !== value) {
            this.value = Math.round(value);
            this.preValue = value;
            this.changeDetection.markForCheck();
            return;
        }
        this.preValue = value;
        this.value = value;
        this.changeDetection.markForCheck();
    };
    RatingComponent.prototype.enter = function (value) {
        if (!this.readonly) {
            this.value = value;
            this.changeDetection.markForCheck();
            this.onHover.emit(value);
        }
    };
    RatingComponent.prototype.reset = function () {
        this.value = this.preValue;
        this.changeDetection.markForCheck();
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
    RatingComponent.prototype.buildTemplateObjects = function (max) {
        var result = [];
        for (var i = 0; i < max; i++) {
            result.push({
                index: i,
                title: this.titles[i] || i + 1
            });
        }
        return result;
    };
    RatingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rating',
                    template: "<span (mouseleave)=\"reset()\" (keydown)=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"range.length\" [attr.aria-valuenow]=\"value\"> <ng-template #star let-value=\"value\" let-index=\"index\">{{index < value ? '&#9733;' : '&#9734;'}}</ng-template> <ng-template ngFor let-r [ngForOf]=\"range\" let-index=\"index\"> <span class=\"sr-only\">({{ index < value ? '*' : ' ' }})</span> <span class=\"bs-rating-star\" (mouseenter)=\"enter(index + 1)\" (click)=\"rate(index + 1)\" [title]=\"r.title\" [style.cursor]=\"readonly ? 'default' : 'pointer'\" [class.active]=\"index < value\"> <ng-template [ngTemplateOutlet]=\"customTemplate || star\" [ngTemplateOutletContext]=\"{index: index, value: value}\"> </ng-template> </span> </ng-template> </span> ",
                    providers: [RATING_CONTROL_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    RatingComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
    ]; };
    RatingComponent.propDecorators = {
        'max': [{ type: Input },],
        'readonly': [{ type: Input },],
        'titles': [{ type: Input },],
        'customTemplate': [{ type: Input },],
        'onHover': [{ type: Output },],
        'onLeave': [{ type: Output },],
        'onKeydown': [{ type: HostListener, args: ['keydown', ['$event'],] },],
    };
    return RatingComponent;
}());
export { RatingComponent };
//# sourceMappingURL=rating.component.js.map