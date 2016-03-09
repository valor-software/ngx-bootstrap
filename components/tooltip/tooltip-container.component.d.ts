import { ElementRef, AfterViewChecked } from 'angular2/core';
import { TooltipOptions } from './tooltip-options.class';
export declare class TooltipContainer implements AfterViewChecked {
    element: ElementRef;
    private classMap;
    private positionMap;
    private top;
    private left;
    private display;
    private content;
    private placement;
    private appendToBody;
    private isOpen;
    private hostEl;
    constructor(element: ElementRef, options: TooltipOptions);
    ngAfterViewChecked(): void;
    position(hostEl: ElementRef): void;
}
