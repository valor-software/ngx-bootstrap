import { DynamicComponentLoader, ViewContainerRef } from 'angular2/core';
export declare class Tooltip {
    content: string;
    placement: string;
    isOpen: boolean;
    enable: boolean;
    animation: boolean;
    appendToBody: boolean;
    viewContainerRef: ViewContainerRef;
    loader: DynamicComponentLoader;
    private visible;
    private tooltip;
    constructor(viewContainerRef: ViewContainerRef, loader: DynamicComponentLoader);
    show(): void;
    hide(): void;
}
