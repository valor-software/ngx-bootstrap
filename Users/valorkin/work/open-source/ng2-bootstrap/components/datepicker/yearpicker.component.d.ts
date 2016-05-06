import { OnInit } from '@angular/core';
import { DatePickerInnerComponent } from './datepicker-inner.component';
export declare class YearPickerComponent implements OnInit {
    datePicker: DatePickerInnerComponent;
    private title;
    private rows;
    constructor(datePicker: DatePickerInnerComponent);
    ngOnInit(): void;
    private getStartingYear(year);
}
