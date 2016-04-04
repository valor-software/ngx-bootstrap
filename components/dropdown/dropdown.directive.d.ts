import { OnInit, OnDestroy, EventEmitter, ElementRef } from 'angular2/core';
export declare class Dropdown implements OnInit, OnDestroy {
    isOpen: boolean;
    autoClose: string;
    keyboardNav: boolean;
    appendToBody: boolean;
    onToggle: EventEmitter<boolean>;
    isOpenChange: EventEmitter<boolean>;
    addClass: boolean;
    selectedOption: number;
    menuEl: ElementRef;
    toggleEl: ElementRef;
    el: ElementRef;
    private _isOpen;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    dropDownMenu: {
        el: ElementRef;
    };
    dropDownToggle: {
        el: ElementRef;
    };
    toggle(open?: boolean): boolean;
    focusDropdownEntry(keyCode: number): void;
    focusToggleElement(): void;
}
