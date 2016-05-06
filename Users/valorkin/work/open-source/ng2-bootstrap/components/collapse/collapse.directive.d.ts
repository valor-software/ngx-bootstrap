import { OnInit, ElementRef, Renderer } from '@angular/core';
export declare class CollapseDirective implements OnInit {
    private display;
    private isExpanded;
    private isCollapsed;
    private isCollapse;
    private isCollapsing;
    private collapse;
    private _el;
    private _renderer;
    constructor(_el: ElementRef, _renderer: Renderer);
    ngOnInit(): void;
    toggle(): void;
    hide(): void;
    show(): void;
}
