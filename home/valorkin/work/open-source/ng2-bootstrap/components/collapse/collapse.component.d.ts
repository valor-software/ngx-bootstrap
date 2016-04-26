import { OnInit, ElementRef, Renderer } from 'angular2/core';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
export declare class Collapse implements OnInit {
    private animation;
    private display;
    private isExpanded;
    private isCollapsed;
    private isCollapse;
    private isCollapsing;
    private transitionDuration;
    private collapse;
    private _ab;
    private _el;
    private _renderer;
    constructor(_ab: AnimationBuilder, _el: ElementRef, _renderer: Renderer);
    ngOnInit(): void;
    toggle(): void;
    hide(): void;
    show(): void;
}
