import { ChangeDetectorRef, ElementRef, AfterViewInit } from 'angular2/core';
import { TooltipOptions } from './tooltip-options.class';
export declare class TooltipContainer implements AfterViewInit {
    private element;
    private cdr;
    private classMap;
    private top;
    private left;
    private display;
    private content;
    private placement;
    private popupClass;
    private animation;
    private isOpen;
    private appendToBody;
    private hostEl;
    constructor(element: ElementRef, cdr: ChangeDetectorRef, options: TooltipOptions);
    ngAfterViewInit(): void;
}
