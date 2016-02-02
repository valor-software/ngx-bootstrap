import { OnInit, ElementRef, DynamicComponentLoader, Renderer } from 'angular2/core';
import { NgModel } from 'angular2/common';
export declare class DatePickerPopup implements OnInit {
    cd: NgModel;
    element: ElementRef;
    renderer: Renderer;
    loader: DynamicComponentLoader;
    private _activeDate;
    private placement;
    private _isOpen;
    private popup;
    constructor(cd: NgModel, element: ElementRef, renderer: Renderer, loader: DynamicComponentLoader);
    activeDate: Date;
    private isOpen;
    ngOnInit(): void;
    private show(cb);
    hide(cb: Function): void;
}
