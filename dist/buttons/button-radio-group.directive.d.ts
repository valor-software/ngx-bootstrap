import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const RADIO_CONTROL_VALUE_ACCESSOR: any;
/**
 * A group of radio buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
export declare class ButtonRadioGroupDirective implements ControlValueAccessor {
    private el;
    private cdr;
    onChange: any;
    onTouched: any;
    value: any;
    private _value;
    constructor(el: ElementRef, cdr: ChangeDetectorRef);
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
