import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
export declare class CollapseDirective {
    private _el;
    private _renderer;
    /** This event fires as soon as content collapses */
    collapsed: EventEmitter<any>;
    /** This event fires as soon as content becomes visible */
    expanded: EventEmitter<any>;
    display: string;
    isExpanded: boolean;
    isCollapsed: boolean;
    isCollapse: boolean;
    isCollapsing: boolean;
    /** A flag indicating visibility of content (shown or hidden) */
    collapse: boolean;
    constructor(_el: ElementRef, _renderer: Renderer2);
    /** allows to manually toggle content visibility */
    toggle(): void;
    /** allows to manually hide content */
    hide(): void;
    /** allows to manually show collapsed content */
    show(): void;
}
