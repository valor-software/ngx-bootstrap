import { ElementRef, OnInit } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
export declare class DropdownMenuDirective implements OnInit {
    dropdown: DropdownDirective;
    el: ElementRef;
    addClass: boolean;
    constructor(dropdown: DropdownDirective, el: ElementRef);
    ngOnInit(): void;
}
