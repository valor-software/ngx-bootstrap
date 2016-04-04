import { OnInit } from 'angular2/core';
import { DatePickerInner } from './datepicker-inner';
export declare class DayPicker implements OnInit {
    labels: Array<any>;
    title: string;
    rows: Array<any>;
    weekNumbers: Array<number>;
    datePicker: DatePickerInner;
    constructor(datePicker: DatePickerInner);
    ngOnInit(): void;
    private getDates(startDate, n);
    private getISO8601WeekNumber(date);
}
