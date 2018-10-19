import { ChangeDetectorRef, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ButtonRadioGroupDirective } from './button-radio-group.directive';
export declare const RADIO_CONTROL_VALUE_ACCESSOR: any;
/**
 * Create radio buttons or groups of buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
export declare class ButtonRadioDirective implements ControlValueAccessor, OnInit {
    private el;
    private cdr;
    private group;
    private renderer;
    onChange: any;
    onTouched: any;
    private _value;
    private _disabled;
    /** Radio button value, will be set to `ngModel` */
    btnRadio: any;
    /** If `true` — radio button can be unchecked */
    uncheckable: boolean;
    /** Current value of radio component or group */
    value: any;
    /** If `true` — radio button is disabled */
    disabled: boolean;
    readonly isActive: boolean;
    constructor(el: ElementRef, cdr: ChangeDetectorRef, group: ButtonRadioGroupDirective, renderer: Renderer2);
    onClick(): void;
    ngOnInit(): void;
    onBlur(): void;
    _onChange(value: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(disabled: boolean): void;
}
