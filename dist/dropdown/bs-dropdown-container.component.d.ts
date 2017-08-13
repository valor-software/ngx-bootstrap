import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BsDropdownState } from './bs-dropdown.state';
export declare class BsDropdownContainerComponent implements OnDestroy {
    private _state;
    private cd;
    isOpen: boolean;
    readonly direction: 'down' | 'up';
    private _subscription;
    constructor(_state: BsDropdownState, cd: ChangeDetectorRef);
    ngOnDestroy(): void;
}
