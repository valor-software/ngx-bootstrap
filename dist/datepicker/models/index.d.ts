import { TimeUnit } from '../../chronos/types';
export declare type BsDatepickerViewMode = 'day' | 'month' | 'year';
/** *************** */
export interface NavigationViewModel {
    monthTitle: string;
    yearTitle: string;
    hideLeftArrow?: boolean;
    hideRightArrow?: boolean;
    disableLeftArrow?: boolean;
    disableRightArrow?: boolean;
}
export interface CalendarCellViewModel {
    date: Date;
    label: string;
    isDisabled?: boolean;
    isHovered?: boolean;
}
/** *************** */
export interface DayViewModel extends CalendarCellViewModel {
    isOtherMonth?: boolean;
    isInRange?: boolean;
    isSelectionStart?: boolean;
    isSelectionEnd?: boolean;
    isSelected?: boolean;
    monthIndex?: number;
    weekIndex?: number;
    dayIndex?: number;
}
export interface WeekViewModel {
    days: DayViewModel[];
}
export interface DaysCalendarViewModel extends NavigationViewModel {
    weeks: WeekViewModel[];
    month: Date;
    weekNumbers: string[];
    weekdays: string[];
}
/** *************** */
export interface MonthsCalendarViewModel extends NavigationViewModel {
    months: CalendarCellViewModel[][];
}
/** *************** */
export interface YearsCalendarViewModel extends NavigationViewModel {
    years: CalendarCellViewModel[][];
}
/** *************** */
/** *************** */
export interface DaysCalendarModel {
    daysMatrix: Date[][];
    month: Date;
}
/** *************** */
export interface MonthViewOptions {
    width?: number;
    height?: number;
    firstDayOfWeek?: number;
}
/** *************** */
export interface DatepickerFormatOptions {
    locale: string;
    monthTitle: string;
    yearTitle: string;
    dayLabel: string;
    monthLabel: string;
    yearLabel: string;
    weekNumbers: string;
}
export interface DatepickerRenderOptions {
    showWeekNumbers?: boolean;
    displayMonths?: number;
}
/** *************** */
/** *************** */
export declare enum BsNavigationDirection {
    UP = 0,
    DOWN = 1,
}
export interface BsNavigationEvent {
    direction?: BsNavigationDirection;
    step?: TimeUnit;
}
export interface BsViewNavigationEvent {
    unit?: TimeUnit;
    viewMode: BsDatepickerViewMode;
}
export interface CellHoverEvent {
    cell: CalendarCellViewModel;
    isHovered: boolean;
}
