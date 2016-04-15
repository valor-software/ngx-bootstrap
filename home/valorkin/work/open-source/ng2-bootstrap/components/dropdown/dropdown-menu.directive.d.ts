import { ElementRef, OnInit } from 'angular2/core';
import { Dropdown } from './dropdown.directive';
export declare class DropdownMenu implements OnInit {
    dropdown: Dropdown;
    el: ElementRef;
    constructor(dropdown: Dropdown, el: ElementRef);
    ngOnInit(): void;
}
