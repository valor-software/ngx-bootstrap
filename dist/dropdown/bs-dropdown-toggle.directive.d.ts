import { ElementRef, OnDestroy } from '@angular/core';
import { BsDropdownState } from './bs-dropdown.state';
export declare class BsDropdownToggleDirective implements OnDestroy {
    private _state;
    private _element;
    isDisabled: boolean;
    isOpen: boolean;
    private _subscriptions;
    constructor(_state: BsDropdownState, _element: ElementRef);
    onClick(): void;
    onDocumentClick(event: any): void;
    onEsc(): void;
    ngOnDestroy(): void;
}
