import { ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { BsDatepickerDirective } from './bs-datepicker.component';
import { BsLocaleService } from './bs-locale.service';
export declare class BsDatepickerInputDirective implements ControlValueAccessor, Validator {
    private _picker;
    private _localeService;
    private _renderer;
    private _elRef;
    private changeDetection;
    private _onChange;
    private _onTouched;
    private _validatorChange;
    private _value;
    constructor(_picker: BsDatepickerDirective, _localeService: BsLocaleService, _renderer: Renderer2, _elRef: ElementRef, changeDetection: ChangeDetectorRef);
    _setInputValue(value: Date): void;
    onChange(event: any): void;
    validate(c: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange(fn: () => void): void;
    writeValue(value: Date | string): void;
    setDisabledState(isDisabled: boolean): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    onBlur(): void;
    hide(): void;
}
