import { DaysCalendarViewModel } from '../models/index';
export interface FlagDaysCalendarOptions {
    isDisabled: boolean;
    minDate: Date;
    maxDate: Date;
    hoveredDate: Date;
    selectedDate: Date;
    selectedRange: Date[];
    displayMonths: number;
    monthIndex: number;
}
export declare function flagDaysCalendar(formattedMonth: DaysCalendarViewModel, options: FlagDaysCalendarOptions): DaysCalendarViewModel;
