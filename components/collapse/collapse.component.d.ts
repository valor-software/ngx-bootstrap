import { OnInit, ElementRef } from 'angular2/core';
import { AnimationBuilder } from 'angular2/animate';
export declare class Collapse implements OnInit {
    private _ab;
    private _el;
    private animation;
    private display;
    private isExpanded;
    private isCollapsed;
    private isCollapse;
    private isCollapsing;
    private transitionDuration;
    private collapse;
    constructor(_ab: AnimationBuilder, _el: ElementRef);
    ngOnInit(): void;
    toggle(): void;
    hide(): void;
    show(): void;
}
