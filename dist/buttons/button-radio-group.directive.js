// tslint:disable:no-use-before-declare
import { ChangeDetectorRef, Directive, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var RADIO_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ButtonRadioGroupDirective; }),
    multi: true
};
/**
 * A group of radio buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
var ButtonRadioGroupDirective = (function () {
    function ButtonRadioGroupDirective(el, cdr) {
        this.el = el;
        this.cdr = cdr;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
    }
    Object.defineProperty(ButtonRadioGroupDirective.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    ButtonRadioGroupDirective.prototype.writeValue = function (value) {
        this._value = value;
        this.cdr.markForCheck();
    };
    ButtonRadioGroupDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    ButtonRadioGroupDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    ButtonRadioGroupDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[btnRadioGroup]',
                    providers: [RADIO_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    ButtonRadioGroupDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
    ]; };
    return ButtonRadioGroupDirective;
}());
export { ButtonRadioGroupDirective };
//# sourceMappingURL=button-radio-group.directive.js.map