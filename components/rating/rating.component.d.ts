import { OnInit } from 'angular2/core';
import { ControlValueAccessor, NgModel } from 'angular2/common';
export declare class Rating implements ControlValueAccessor, OnInit {
    cd: NgModel;
    private max;
    private stateOn;
    private stateOff;
    private readonly;
    private titles;
    private ratingStates;
    private onHover;
    private onLeave;
    private range;
    private value;
    private preValue;
    private onKeydown(event);
    constructor(cd: NgModel);
    ngOnInit(): void;
    writeValue(value: number): void;
    private buildTemplateObjects(ratingStates, max);
    private rate(value);
    private enter(value);
    private reset();
    onChange: (_: any) => void;
    onTouched: () => void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
