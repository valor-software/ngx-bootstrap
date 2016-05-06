import { OnInit } from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/common';
export declare class ButtonCheckboxDirective implements ControlValueAccessor, OnInit {
    cd: NgModel;
    btnCheckboxTrue: any;
    btnCheckboxFalse: any;
    state: boolean;
    protected onChange: any;
    protected onTouched: any;
    private value;
    onClick(): void;
    constructor(cd: NgModel);
    ngOnInit(): any;
    private trueValue;
    private falseValue;
    toggle(state: boolean): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
