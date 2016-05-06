import { DynamicComponentLoader, Renderer, ViewContainerRef } from '@angular/core';
import { NgModel } from '@angular/common';
export declare class DatePickerPopupDirective {
    cd: NgModel;
    viewContainerRef: ViewContainerRef;
    renderer: Renderer;
    loader: DynamicComponentLoader;
    private _activeDate;
    private _isOpen;
    private placement;
    private popup;
    constructor(cd: NgModel, viewContainerRef: ViewContainerRef, renderer: Renderer, loader: DynamicComponentLoader);
    activeDate: Date;
    private isOpen;
    hide(cb: Function): void;
    private show(cb);
}
