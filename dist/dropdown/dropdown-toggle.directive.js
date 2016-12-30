"use strict";
var core_1 = require('@angular/core');
var dropdown_directive_1 = require('./dropdown.directive');
/* tslint:disable-next-line */
var MouseEvent = global.MouseEvent;
/** Mark element which can toggle dropdown visibility with this directive */
var DropdownToggleDirective = (function () {
    function DropdownToggleDirective(dropdown, el) {
        /** if true dropdown toggle will be disabled */
        this.isDisabled = false;
        /** if true the dropdown-toggle class will be added to the element */
        this.addToggleClass = true;
        this.addClass = true;
        this.dropdown = dropdown;
        this.el = el;
    }
    DropdownToggleDirective.prototype.ngOnInit = function () {
        this.dropdown.dropDownToggle = this;
    };
    Object.defineProperty(DropdownToggleDirective.prototype, "isOpen", {
        get: function () {
            return this.dropdown.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    DropdownToggleDirective.prototype.toggleDropdown = function (event) {
        event.stopPropagation();
        if (!this.isDisabled) {
            this.dropdown.toggle();
        }
        return false;
    };
    DropdownToggleDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[dropdownToggle]',
                    exportAs: 'bs-dropdown-toggle'
                },] },
    ];
    /** @nocollapse */
    DropdownToggleDirective.ctorParameters = function () { return [
        { type: dropdown_directive_1.DropdownDirective, decorators: [{ type: core_1.Host },] },
        { type: core_1.ElementRef, },
    ]; };
    DropdownToggleDirective.propDecorators = {
        'isDisabled': [{ type: core_1.HostBinding, args: ['class.disabled',] }, { type: core_1.Input },],
        'addToggleClass': [{ type: core_1.HostBinding, args: ['class.dropdown-toggle',] }, { type: core_1.Input },],
        'addClass': [{ type: core_1.HostBinding, args: ['attr.aria-haspopup',] },],
        'isOpen': [{ type: core_1.HostBinding, args: ['attr.aria-expanded',] },],
        'toggleDropdown': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
    };
    return DropdownToggleDirective;
}());
exports.DropdownToggleDirective = DropdownToggleDirective;
