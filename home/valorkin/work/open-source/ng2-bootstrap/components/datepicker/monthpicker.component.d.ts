import { OnInit } from 'angular2/core';
import { DatePickerInnerComponent } from './datepicker-inner.component';
export declare class MonthPickerComponent implements OnInit {
    title: string;
    rows: Array<any>;
    datePicker: DatePickerInnerComponent;
    constructor(datePicker: DatePickerInnerComponent);
    ngOnInit(): void;
}
