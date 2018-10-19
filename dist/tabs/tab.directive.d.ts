import { EventEmitter, TemplateRef, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { TabsetComponent } from './tabset.component';
export declare class TabDirective implements OnInit, OnDestroy {
    elementRef: ElementRef;
    renderer: Renderer2;
    /** tab header text */
    heading: string;
    /** tab id. The same id with suffix '-link' will be added to the corresponding &lt;li&gt; element  */
    id: string;
    /** if true tab can not be activated */
    disabled: boolean;
    /** if true tab can be removable, additional button will appear */
    removable: boolean;
    /** if set, will be added to the tab's class attribute. Multiple classes are supported. */
    customClass: string;
    /** tab active state toggle */
    active: boolean;
    /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
    select: EventEmitter<TabDirective>;
    /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
    deselect: EventEmitter<TabDirective>;
    /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
    removed: EventEmitter<TabDirective>;
    addClass: boolean;
    headingRef: TemplateRef<any>;
    tabset: TabsetComponent;
    protected _active: boolean;
    protected _customClass: string;
    constructor(tabset: TabsetComponent, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
