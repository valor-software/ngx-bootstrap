import { OnDestroy, TemplateRef, EventEmitter } from 'angular2/core';
import { TabsetComponent } from './tabset.component';
export declare class TabDirective implements OnDestroy {
    heading: string;
    disabled: boolean;
    removable: boolean;
    active: boolean;
    select: EventEmitter<TabDirective>;
    deselect: EventEmitter<TabDirective>;
    removed: EventEmitter<TabDirective>;
    addClass: boolean;
    headingRef: TemplateRef;
    tabset: TabsetComponent;
    private _active;
    constructor(tabset: TabsetComponent);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
