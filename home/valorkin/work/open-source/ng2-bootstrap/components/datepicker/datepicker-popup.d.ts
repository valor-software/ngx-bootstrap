import { OnInit, ElementRef, DynamicComponentLoader, Renderer } from 'angular2/core';
import { NgModel } from 'angular2/common';
export declare class DatePickerPopup implements OnInit {
    cd: NgModel;
    element: ElementRef;
    renderer: Renderer;
    loader: DynamicComponentLoader;
    private _activeDate;
    private _isOpen;
    private placement;
    private popup;
    constructor(cd: NgModel, element: ElementRef, renderer: Renderer, loader: DynamicComponentLoader);
    activeDate: Date;
    private isOpen;
    ngOnInit(): void;
    hide(cb: Function): void;
    private show(cb);
}
