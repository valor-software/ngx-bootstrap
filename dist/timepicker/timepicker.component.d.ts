import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { TimepickerConfig } from './timepicker.config';
export declare const TIMEPICKER_CONTROL_VALUE_ACCESSOR: any;
export declare class TimepickerComponent implements ControlValueAccessor, OnInit {
    /** hours change step */
    hourStep: number;
    /** hours change step */
    minuteStep: number;
    /** if true hours and minutes fields will be readonly */
    readonlyInput: boolean;
    /** if true scroll inside hours and minutes inputs will change time */
    mousewheel: boolean;
    /** if true up/down arrowkeys inside hours and minutes inputs will change time */
    arrowkeys: boolean;
    /** if true spinner arrows above and below the inputs will be shown */
    showSpinners: boolean;
    /** minimum time user can select */
    min: Date;
    /** maximum time user can select */
    max: Date;
    /** meridian labels based on locale */
    meridians: string[];
    /** if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM */
    showMeridian: boolean;
    onChange: any;
    onTouched: any;
    hours: string;
    minutes: string;
    invalidHours: any;
    invalidMinutes: any;
    meridian: any;
    protected _selected: Date;
    protected _showMeridian: boolean;
    protected selected: Date;
    protected config: TimepickerConfig;
    constructor(_config: TimepickerConfig);
    ngOnInit(): void;
    writeValue(v: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    setDisabledState(isDisabled: boolean): void;
    updateHours(): void;
    hoursOnBlur(): void;
    updateMinutes(): void;
    minutesOnBlur(): void;
    incrementHours(): void;
    decrementHours(): void;
    incrementMinutes(): void;
    decrementMinutes(): void;
    noIncrementHours(): boolean;
    noDecrementHours(): boolean;
    noIncrementMinutes(): boolean;
    noDecrementMinutes(): boolean;
    toggleMeridian(): void;
    noToggleMeridian(): boolean;
    protected refresh(): void;
    protected updateTemplate(): void;
    protected getHoursFromTemplate(): number;
    protected getMinutesFromTemplate(): number;
    protected pad(value: string | number): string;
    protected addMinutesToSelected(minutes: any): void;
}
