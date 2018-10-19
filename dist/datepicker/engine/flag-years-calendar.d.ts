import { YearsCalendarViewModel } from '../models/index';
export interface FlagYearsCalendarOptions {
    isDisabled: boolean;
    minDate: Date;
    maxDate: Date;
    hoveredYear: Date;
    displayMonths: number;
    yearIndex: number;
}
export declare function flagYearsCalendar(yearsCalendar: YearsCalendarViewModel, options: FlagYearsCalendarOptions): YearsCalendarViewModel;
