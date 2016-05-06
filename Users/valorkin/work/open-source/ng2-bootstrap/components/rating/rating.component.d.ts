import { OnInit, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/common';
export declare class RatingComponent implements ControlValueAccessor, OnInit {
    max: number;
    stateOn: string;
    stateOff: string;
    readonly: boolean;
    titles: Array<string>;
    ratingStates: Array<{
        stateOn: string;
        stateOff: string;
    }>;
    onHover: EventEmitter<number>;
    onLeave: EventEmitter<number>;
    onChange: any;
    onTouched: any;
    cd: NgModel;
    private range;
    private value;
    private preValue;
    protected onKeydown(event: KeyboardEvent): void;
    constructor(cd: NgModel);
    ngOnInit(): void;
    writeValue(value: number): void;
    protected enter(value: number): void;
    protected reset(): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    private buildTemplateObjects(ratingStates, max);
    private rate(value);
}
