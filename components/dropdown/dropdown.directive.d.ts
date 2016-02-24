import { OnInit, OnDestroy, EventEmitter, ElementRef, QueryList } from 'angular2/core';
export declare class Dropdown implements OnInit, OnDestroy {
    el: ElementRef;
    isOpen: boolean;
    autoClose: string;
    keyboardNav: boolean;
    appendToBody: boolean;
    onToggle: EventEmitter<boolean>;
    isOpenChange: EventEmitter<boolean>;
    private addClass;
    private _isOpen;
    selectedOption: number;
    menuEl: ElementRef;
    toggleEl: ElementRef;
    constructor(el: ElementRef, dropdownMenuList: QueryList<ElementRef>);
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
