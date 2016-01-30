import { OnInit } from 'angular2/core';
import { ControlValueAccessor, NgModel } from 'angular2/common';
export declare class ButtonCheckbox implements ControlValueAccessor, OnInit {
    cd: NgModel;
    private btnCheckboxTrue;
    private btnCheckboxFalse;
    private state;
    private onClick();
    private value;
    constructor(cd: NgModel);
    ngOnInit(): void;
    private trueValue;
    private falseValue;
    private toggle(state);
    writeValue(value: any): void;
    protected onChange: (_: any) => void;
    protected onTouched: () => void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
