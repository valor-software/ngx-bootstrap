import { OnInit } from 'angular2/core';
import { DatePickerInner } from './datepicker-inner';
export declare class MonthPicker implements OnInit {
    datePicker: DatePickerInner;
    title: string;
    rows: Array<any>;
    constructor(datePicker: DatePickerInner);
    ngOnInit(): void;
}
