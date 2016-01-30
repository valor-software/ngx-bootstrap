import { OnInit, ElementRef } from 'angular2/core';
import { ControlValueAccessor, NgModel } from 'angular2/common';
export declare class ButtonRadio implements ControlValueAccessor, OnInit {
    cd: NgModel;
    el: ElementRef;
    private btnRadio;
    private uncheckable;
    private isActive;
    private onClick();
    constructor(cd: NgModel, el: ElementRef);
    ngOnInit(): void;
    protected value: any;
    writeValue(value: any): void;
    onChange: (_: any) => void;
    onTouched: () => void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
