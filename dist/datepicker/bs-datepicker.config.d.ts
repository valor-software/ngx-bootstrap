import { DatepickerRenderOptions } from './models/index';
/**
 * For date range picker there are `BsDaterangepickerConfig` which inherits all properties,
 * except `displayMonths`, for range picker it default to `2`
 */
export declare class BsDatepickerConfig implements DatepickerRenderOptions {
    value?: Date | Date[];
    isDisabled?: boolean;
    /**
     * Default min date for all date/range pickers
     */
    minDate?: Date;
    /**
     * Default max date for all date/range pickers
     */
    maxDate?: Date;
    /** CSS class which will be applied to datepicker container,
     * usually used to set color theme
     */
    containerClass: string;
    displayMonths: number;
    /**
     * Allows to hide week numbers in datepicker
     */
    showWeekNumbers: boolean;
    dateInputFormat: string;
    rangeSeparator: string;
    /**
     * Date format for date range input field
     */
    rangeInputFormat: string;
    monthTitle: string;
    yearTitle: string;
    dayLabel: string;
    monthLabel: string;
    yearLabel: string;
    weekNumbers: string;
    changeMonthOnClick: boolean;
    disableYearView: boolean;
    disableMonthView: boolean;
}
