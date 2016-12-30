"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
exports.RADIO_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return ButtonRadioDirective; }),
    multi: true
};
/**
 * Create radio buttons or groups of buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
var ButtonRadioDirective = (function () {
    function ButtonRadioDirective(el) {
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.el = el;
    }
    Object.defineProperty(ButtonRadioDirective.prototype, "isActive", {
        get: function () {
            return this.btnRadio === this.value;
        },
        enumerable: true,
        configurable: true
    });
    ButtonRadioDirective.prototype.onClick = function () {
        if (this.el.nativeElement.attributes.disabled) {
            return;
        }
        if (this.uncheckable && this.btnRadio === this.value) {
            this.value = undefined;
        }
        else {
            this.value = this.btnRadio;
        }
        this.onTouched();
        this.onChange(this.value);
    };
    ButtonRadioDirective.prototype.ngOnInit = function () {
        this.uncheckable = typeof this.uncheckable !== 'undefined';
    };
    ButtonRadioDirective.prototype.onBlur = function () {
        this.onTouched();
    };
    // ControlValueAccessor
    // model -> view
    ButtonRadioDirective.prototype.writeValue = function (value) {
        this.value = value;
    };
    ButtonRadioDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    ButtonRadioDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    ButtonRadioDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[btnRadio]', providers: [exports.RADIO_CONTROL_VALUE_ACCESSOR] },] },
    ];
    /** @nocollapse */
    ButtonRadioDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    ButtonRadioDirective.propDecorators = {
        'btnRadio': [{ type: core_1.Input },],
        'uncheckable': [{ type: core_1.Input },],
        'value': [{ type: core_1.Input },],
        'isActive': [{ type: core_1.HostBinding, args: ['class.active',] },],
        'onClick': [{ type: core_1.HostListener, args: ['click',] },],
    };
    return ButtonRadioDirective;
}());
exports.ButtonRadioDirective = ButtonRadioDirective;
