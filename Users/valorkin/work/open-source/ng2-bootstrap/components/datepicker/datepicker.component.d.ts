import { ControlValueAccessor, NgModel } from '@angular/common';
export declare class DatePickerComponent implements ControlValueAccessor {
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
    onChange: any;
    onTouched: any;
    cd: NgModel;
    private _now;
    private _activeDate;
    activeDate: Date;
    constructor(cd: NgModel);
    onUpdate(event: any): void;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
