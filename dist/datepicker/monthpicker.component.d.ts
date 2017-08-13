import { OnInit } from '@angular/core';
import { DatePickerInnerComponent } from './datepicker-inner.component';
export declare class MonthPickerComponent implements OnInit {
    title: string;
    rows: any[];
    datePicker: DatePickerInnerComponent;
    maxMode: string;
    constructor(datePicker: DatePickerInnerComponent);
    readonly isBs4: boolean;
    ngOnInit(): void;
}
