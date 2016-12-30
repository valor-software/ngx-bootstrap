import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const CHECKBOX_CONTROL_VALUE_ACCESSOR: any;
/**
 * Add checkbox functionality to any element
 */
export declare class ButtonCheckboxDirective implements ControlValueAccessor, OnInit {
    /** Truthy value, will be set to ngModel */
    btnCheckboxTrue: any;
    /** Falsy value, will be set to ngModel */
    btnCheckboxFalse: any;
    state: boolean;
    protected value: any;
    protected isDisabled: boolean;
    protected onChange: any;
    protected onTouched: any;
    onClick(): void;
    ngOnInit(): any;
    protected readonly trueValue: boolean;
    protected readonly falseValue: boolean;
    toggle(state: boolean): void;
    writeValue(value: any): void;
    setDisabledState(isDisabled: boolean): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
