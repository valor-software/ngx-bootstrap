import { ChangeDetectorRef, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { BsDropdownState } from './bs-dropdown.state';
export declare class BsDropdownContainerComponent implements OnDestroy {
    private _state;
    private cd;
    private _renderer;
    isOpen: boolean;
    readonly direction: 'down' | 'up';
    private _subscription;
    constructor(_state: BsDropdownState, cd: ChangeDetectorRef, _renderer: Renderer2, _element: ElementRef);
    ngOnDestroy(): void;
}
