import { ElementRef, OnInit } from 'angular2/core';
import { Dropdown } from './dropdown.directive';
export declare class DropdownToggle implements OnInit {
    disabled: boolean;
    addClass: boolean;
    dropdown: Dropdown;
    el: ElementRef;
    constructor(dropdown: Dropdown, el: ElementRef);
    ngOnInit(): void;
    isOpen: boolean;
    toggleDropdown(event: MouseEvent): boolean;
}
