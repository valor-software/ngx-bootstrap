import { ElementRef, OnInit } from 'angular2/core';
import { Dropdown } from './dropdown.directive';
export declare class DropdownToggle implements OnInit {
    dropdown: Dropdown;
    el: ElementRef;
    private disabled;
    private addClass;
    constructor(dropdown: Dropdown, el: ElementRef);
    ngOnInit(): void;
    isOpen: boolean;
    toggleDropdown(event: MouseEvent): boolean;
}
