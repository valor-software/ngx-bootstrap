import { OnInit } from 'angular2/core';
import { ControlValueAccessor, NgModel } from 'angular2/common';
export declare class ButtonCheckbox implements ControlValueAccessor, OnInit {
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
