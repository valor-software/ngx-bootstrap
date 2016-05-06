import { ChangeDetectorRef, ElementRef, AfterViewInit } from '@angular/core';
import { TooltipOptions } from './tooltip-options.class';
export declare class TooltipContainerComponent implements AfterViewInit {
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
    private element;
    private cdr;
    constructor(element: ElementRef, cdr: ChangeDetectorRef, options: TooltipOptions);
    ngAfterViewInit(): void;
}
