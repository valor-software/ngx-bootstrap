import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const RATING_CONTROL_VALUE_ACCESSOR: any;
export declare class RatingComponent implements ControlValueAccessor, OnInit {
    /** number of icons */
    max: number;
    /** selected icon class */
    stateOn: string;
    /** unselected icon class */
    stateOff: string;
    /** if true will not react on any user events */
    readonly: boolean;
    /** array of icons titles, default: (["one", "two", "three", "four", "five"]) */
    titles: string[];
    /** array of custom icons classes */
    ratingStates: {
        stateOn: string;
        stateOff: string;
    }[];
    /** fired when icon selected, $event:number equals to selected rating */
    onHover: EventEmitter<number>;
    /** fired when icon selected, $event:number equals to previous rating value */
    onLeave: EventEmitter<number>;
    onChange: any;
    onTouched: any;
    range: any[];
    value: number;
    protected preValue: number;
    onKeydown(event: any): void;
    ngOnInit(): void;
    writeValue(value: number): void;
    enter(value: number): void;
    reset(): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    rate(value: number): void;
    protected buildTemplateObjects(ratingStates: any[], max: number): any[];
}
