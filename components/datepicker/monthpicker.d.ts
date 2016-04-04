import { OnInit } from 'angular2/core';
import { DatePickerInner } from './datepicker-inner';
export declare class MonthPicker implements OnInit {
    title: string;
    rows: Array<any>;
    datePicker: DatePickerInner;
    constructor(datePicker: DatePickerInner);
    ngOnInit(): void;
}
