import { OnInit, ElementRef, DynamicComponentLoader } from 'angular2/core';
export declare class Tooltip implements OnInit {
    element: ElementRef;
    loader: DynamicComponentLoader;
    content: string;
    placement: string;
    isOpen: boolean;
    enable: boolean;
    appendToBody: boolean;
    private visible;
    private tooltip;
    constructor(element: ElementRef, loader: DynamicComponentLoader);
    ngOnInit(): void;
    show(): void;
    hide(): void;
}
