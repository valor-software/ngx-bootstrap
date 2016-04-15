import { ControlValueAccessor, NgModel } from 'angular2/common';
export declare class DatePicker implements ControlValueAccessor {
    datepickerMode: string;
    initDate: Date;
    minDate: Date;
    maxDate: Date;
    minMode: string;
    maxMode: string;
    showWeeks: boolean;
    formatDay: string;
    formatMonth: string;
    formatYear: string;
    formatDayHeader: string;
    formatDayTitle: string;
    formatMonthTitle: string;
    startingDay: number;
    yearRange: number;
    onlyCurrentMonth: boolean;
    shortcutPropagation: boolean;
    customClass: Array<{
        date: Date;
        mode: string;
        clazz: string;
    }>;
    dateDisabled: any;
    cd: NgModel;
    private _activeDate;
    activeDate: Date;
    constructor(cd: NgModel);
    private _now;
    onUpdate(event: any): void;
    writeValue(value: any): void;
    onChange: any;
    onTouched: any;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
