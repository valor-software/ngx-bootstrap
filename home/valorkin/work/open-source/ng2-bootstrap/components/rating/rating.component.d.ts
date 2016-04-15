import { OnInit, EventEmitter } from 'angular2/core';
import { ControlValueAccessor, NgModel } from 'angular2/common';
export declare class Rating implements ControlValueAccessor, OnInit {
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
    onChange: any;
    onTouched: any;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    private buildTemplateObjects(ratingStates, max);
    private rate(value);
}
