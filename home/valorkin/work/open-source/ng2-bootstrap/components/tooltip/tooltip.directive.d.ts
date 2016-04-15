import { OnInit, ElementRef, DynamicComponentLoader } from 'angular2/core';
export declare class Tooltip implements OnInit {
    content: string;
    placement: string;
    isOpen: boolean;
    enable: boolean;
    animation: boolean;
    appendToBody: boolean;
    element: ElementRef;
    loader: DynamicComponentLoader;
    private visible;
    private tooltip;
    constructor(element: ElementRef, loader: DynamicComponentLoader);
    ngOnInit(): void;
    show(): void;
    hide(): void;
}
