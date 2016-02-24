import { OnDestroy, TemplateRef, EventEmitter } from 'angular2/core';
import { Tabset } from './tabset.component';
export declare class Tab implements OnDestroy {
    tabset: Tabset;
    heading: string;
    disabled: boolean;
    removable: boolean;
    active: boolean;
    select: EventEmitter<Tab>;
    deselect: EventEmitter<Tab>;
    removed: EventEmitter<Tab>;
    private addClass;
    private _active;
    headingRef: TemplateRef;
    constructor(tabset: Tabset);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
