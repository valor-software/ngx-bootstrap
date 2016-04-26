import { DynamicComponentLoader, Renderer, ViewContainerRef } from 'angular2/core';
import { NgModel } from 'angular2/common';
export declare class DatePickerPopup {
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
