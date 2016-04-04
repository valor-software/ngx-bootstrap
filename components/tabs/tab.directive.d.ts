import { OnDestroy, TemplateRef, EventEmitter } from 'angular2/core';
import { Tabset } from './tabset.component';
export declare class Tab implements OnDestroy {
    heading: string;
    disabled: boolean;
    removable: boolean;
    active: boolean;
    select: EventEmitter<Tab>;
    deselect: EventEmitter<Tab>;
    removed: EventEmitter<Tab>;
    addClass: boolean;
    headingRef: TemplateRef;
    tabset: Tabset;
    private _active;
    constructor(tabset: Tabset);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
