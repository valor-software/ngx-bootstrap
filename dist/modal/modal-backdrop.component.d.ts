import { ElementRef, Renderer } from '@angular/core';
export declare class ModalBackdropOptions {
    animate: boolean;
    constructor(options: ModalBackdropOptions);
}
/** This component will be added as background layout for modals if enabled */
export declare class ModalBackdropComponent {
    isAnimated: boolean;
    isShown: boolean;
    element: ElementRef;
    renderer: Renderer;
    protected _isAnimated: boolean;
    protected _isShown: boolean;
    constructor(element: ElementRef, renderer: Renderer);
}
