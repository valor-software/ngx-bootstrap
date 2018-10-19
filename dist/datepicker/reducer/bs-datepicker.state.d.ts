import { BsDatepickerViewMode, DatepickerFormatOptions, DatepickerRenderOptions, DaysCalendarModel, DaysCalendarViewModel, MonthsCalendarViewModel, MonthViewOptions, YearsCalendarViewModel } from '../models/index';
export interface BsDatepickerViewState {
    date: Date;
    mode: BsDatepickerViewMode;
}
export declare class BsDatepickerState implements DatepickerRenderOptions, DatepickerFormatOptions {
    selectedDate?: Date;
    selectedRange?: Date[];
    view: BsDatepickerViewState;
    isDisabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    hoveredDate?: Date;
    hoveredMonth?: Date;
    hoveredYear?: Date;
    monthsModel?: DaysCalendarModel[];
    formattedMonths?: DaysCalendarViewModel[];
    flaggedMonths?: DaysCalendarViewModel[];
    monthsCalendar?: MonthsCalendarViewModel[];
    flaggedMonthsCalendar?: MonthsCalendarViewModel[];
    yearsCalendarModel?: YearsCalendarViewModel[];
    yearsCalendarFlagged?: YearsCalendarViewModel[];
    monthViewOptions: MonthViewOptions;
    showWeekNumbers?: boolean;
    displayMonths?: number;
    locale: string;
    monthTitle: string;
    yearTitle: string;
    dayLabel: string;
    monthLabel: string;
    yearLabel: string;
    weekNumbers: string;
    changeMonthOnClick: boolean;
}
export declare const initialDatepickerState: BsDatepickerState;
