import { OnInit } from 'angular2/core';
import { DatePickerInnerComponent } from './datepicker-inner.component';
export declare class YearPickerComponent implements OnInit {
    datePicker: DatePickerInnerComponent;
    private title;
    private rows;
    constructor(datePicker: DatePickerInnerComponent);
    ngOnInit(): void;
    private getStartingYear(year);
}
