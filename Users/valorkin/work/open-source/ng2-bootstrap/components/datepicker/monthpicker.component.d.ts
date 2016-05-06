import { OnInit } from '@angular/core';
import { DatePickerInnerComponent } from './datepicker-inner.component';
export declare class MonthPickerComponent implements OnInit {
    title: string;
    rows: Array<any>;
    datePicker: DatePickerInnerComponent;
    constructor(datePicker: DatePickerInnerComponent);
    ngOnInit(): void;
}
