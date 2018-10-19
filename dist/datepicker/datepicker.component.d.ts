import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DatePickerInnerComponent } from './datepicker-inner.component';
import { DatepickerConfig } from './datepicker.config';
export declare const DATEPICKER_CONTROL_VALUE_ACCESSOR: any;
export declare class DatePickerComponent implements ControlValueAccessor {
    /** sets datepicker mode, supports: `day`, `month`, `year` */
    datepickerMode: string;
    /** default date to show if `ng-model` value is not specified */
    initDate: Date;
    /**  oldest selectable date */
    minDate: Date;
    /** latest selectable date */
    maxDate: Date;
    /** set lower datepicker mode, supports: `day`, `month`, `year` */
    minMode: string;
    /** sets upper datepicker mode, supports: `day`, `month`, `year` */
    maxMode: string;
    /** if false week numbers will be hidden */
    showWeeks: boolean;
    /** format of day in month */
    formatDay: string;
    /** format of month in year */
    formatMonth: string;
    /** format of year in year range */
    formatYear: string;
    /** format of day in week header */
    formatDayHeader: string;
    /** format of title when selecting day */
    formatDayTitle: string;
    /** format of title when selecting month */
    formatMonthTitle: string;
    /** starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday) */
    startingDay: number;
    /** number of years displayed in year selection */
    yearRange: number;
    /** if true only dates from the currently displayed month will be shown */
    onlyCurrentMonth: boolean;
    /** if true shortcut`s event propagation will be disabled */
    shortcutPropagation: boolean;
    /** number of months displayed in a single row of month picker */
    monthColLimit: number;
    /** number of years displayed in a single row of year picker */
    yearColLimit: number;
    /** array of custom css classes to be applied to targeted dates */
    customClass: {
        date: Date;
        mode: string;
        clazz: string;
    }[];
    /** array of disabled dates */
    dateDisabled: {
        date: Date;
        mode: string;
    }[];
    /** disabled days of the week from 0-6 (0=Sunday, ..., 6=Saturday) */
    dayDisabled: number[];
    /** currently active date */
    activeDate: Date;
    selectionDone: EventEmitter<Date>;
    /** callback to invoke when the activeDate is changed. */
    activeDateChange: EventEmitter<Date>;
    _datePicker: DatePickerInnerComponent;
    onChange: any;
    onTouched: any;
    config: DatepickerConfig;
    protected _now: Date;
    protected _activeDate: Date;
    constructor(config: DatepickerConfig);
    configureOptions(): void;
    onUpdate(event: any): void;
    onSelectionDone(event: Date): void;
    onActiveDateChange(event: Date): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
