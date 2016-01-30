import { ElementRef } from 'angular2/core';
import { TooltipOptions } from './tooltip-options.class';
export declare class TooltipContainer {
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
    constructor(element: ElementRef, options: TooltipOptions);
    position(hostEl: ElementRef): void;
}
