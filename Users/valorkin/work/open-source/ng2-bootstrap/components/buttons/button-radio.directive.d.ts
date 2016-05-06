import { OnInit, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/common';
export declare class ButtonRadioDirective implements ControlValueAccessor, OnInit {
    cd: NgModel;
    el: ElementRef;
    onChange: any;
    onTouched: any;
    private btnRadio;
    private uncheckable;
    isActive: boolean;
    onClick(): void;
    constructor(cd: NgModel, el: ElementRef);
    ngOnInit(): void;
    protected value: any;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
