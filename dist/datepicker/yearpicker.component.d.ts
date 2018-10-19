import { OnInit } from '@angular/core';
import { DatePickerInnerComponent } from './datepicker-inner.component';
export declare class YearPickerComponent implements OnInit {
    datePicker: DatePickerInnerComponent;
    title: string;
    rows: any[];
    constructor(datePicker: DatePickerInnerComponent);
    readonly isBs4: boolean;
    ngOnInit(): void;
    protected getStartingYear(year: number): number;
}
