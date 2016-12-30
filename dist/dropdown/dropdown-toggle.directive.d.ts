import { ElementRef, OnInit } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
/** Mark element which can toggle dropdown visibility with this directive */
export declare class DropdownToggleDirective implements OnInit {
    /** if true dropdown toggle will be disabled */
    isDisabled: boolean;
    /** if true the dropdown-toggle class will be added to the element */
    addToggleClass: boolean;
    addClass: boolean;
    dropdown: DropdownDirective;
    el: ElementRef;
    constructor(dropdown: DropdownDirective, el: ElementRef);
    ngOnInit(): void;
    readonly isOpen: boolean;
    toggleDropdown(event: MouseEvent): boolean;
}
