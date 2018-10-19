import { OnInit } from '@angular/core';
import { DatePickerInnerComponent } from './datepicker-inner.component';
export declare class DayPickerComponent implements OnInit {
    labels: any[];
    title: string;
    rows: any[];
    weekNumbers: number[];
    datePicker: DatePickerInnerComponent;
    constructor(datePicker: DatePickerInnerComponent);
    readonly isBs4: boolean;
    ngOnInit(): void;
    protected getDates(startDate: Date, n: number): Date[];
    protected getISO8601WeekNumber(date: Date): number;
}
