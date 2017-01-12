"use strict";
var core_1 = require('@angular/core');
var dropdown_directive_1 = require('./dropdown.directive');
var DropdownMenuDirective = (function () {
    /* tslint:enable:no-unused-variable */
    function DropdownMenuDirective(dropdown, el) {
        /* tslint:disable:no-unused-variable */
        this.addClass = true;
        this.dropdown = dropdown;
        this.el = el;
    }
    DropdownMenuDirective.prototype.ngOnInit = function () {
        this.dropdown.dropDownMenu = this;
    };
    DropdownMenuDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[dropdownMenu]',
                    exportAs: 'bs-dropdown-menu'
                },] },
    ];
    /** @nocollapse */
    DropdownMenuDirective.ctorParameters = function () { return [
        { type: dropdown_directive_1.DropdownDirective, decorators: [{ type: core_1.Host },] },
        { type: core_1.ElementRef, },
    ]; };
    DropdownMenuDirective.propDecorators = {
        'addClass': [{ type: core_1.HostBinding, args: ['class.dropdown-menu',] },],
    };
    return DropdownMenuDirective;
}());
exports.DropdownMenuDirective = DropdownMenuDirective;
