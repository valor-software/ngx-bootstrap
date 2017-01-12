import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { DropdownConfig } from './dropdown.config';
/**
 * Mark dropdown content with this directive
 */
export declare class DropdownDirective implements OnInit, OnDestroy {
    /** if `true` dropdown will be opened */
    isOpen: boolean;
    /** behaviour vary:
     * - nonInput - (default) automatically closes the dropdown when any of its elements is clicked — as long as the clicked element is not an input or a textarea.
     * - always - automatically closes the dropdown when any of its elements is clicked
     * - outsideClick - closes the dropdown automatically only when the user clicks any element outside the dropdown
     * - disabled - disables the auto close. You can then control the open/close status of the dropdown manually, by using is-open. Please notice that the dropdown will still close if the toggle is clicked, the esc key is pressed or another dropdown is open
     */
    autoClose: string;
    /** if true will enable navigation of dropdown list elements with the arrow keys */
    keyboardNav: boolean;
    /** Allows to attach dropdown to body, will be replaced with container="body" */
    appendToBody: boolean;
    /** fired when dropdown toggles, $event:boolean equals dropdown isOpen state */
    onToggle: EventEmitter<boolean>;
    /** fired when isOpen value changes */
    isOpenChange: EventEmitter<boolean>;
    addClass: boolean;
    selectedOption: number;
    menuEl: ElementRef;
    toggleEl: ElementRef;
    el: ElementRef;
    protected _isOpen: boolean;
    protected _changeDetector: ChangeDetectorRef;
    constructor(el: ElementRef, ref: ChangeDetectorRef, config: DropdownConfig);
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
