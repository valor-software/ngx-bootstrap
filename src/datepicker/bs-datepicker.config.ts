import { Injectable } from '@angular/core';
import {
  DatepickerRenderOptions,
  BsDatepickerViewMode,
  DatepickerDateCustomClasses
} from './models';


/**
 * For date range picker there are `BsDaterangepickerConfig` which inherits all properties,
 * except `displayMonths`, for range picker it default to `2`
 */
@Injectable()
export class BsDatepickerConfig implements DatepickerRenderOptions {
  /** sets use adaptive position */
  adaptivePosition = false;
  /** turn on/off animation */
  isAnimated = false;
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
  /**
   * Default date custom classes for all date/range pickers
   */
  dateCustomClasses: DatepickerDateCustomClasses[];

  daysDisabled?: number[];

  /**
   * Disable specific dates
   */
  datesDisabled?: Date[];
  /**
   * Makes dates from other months active
   */
  selectFromOtherMonth?: boolean;

  /**
   * Makes dates from other months active
   */
  selectWeek?: boolean;

  /**
   * Add class to current day
   */
  customTodayClass?: string;

  /**
   * Default mode for all date pickers
   */
  minMode?: BsDatepickerViewMode;

  /** CSS class which will be applied to datepicker container,
   * usually used to set color theme
   */
  containerClass = 'theme-green';

  // DatepickerRenderOptions
  displayMonths = 1;
  /**
   * Allows to hide week numbers in datepicker
   */
  showWeekNumbers = true;

  dateInputFormat = 'L';
  // range picker
  rangeSeparator = ' - ';
  /**
   * Date format for date range input field
   */
  rangeInputFormat = 'L';

  // DatepickerFormatOptions
  monthTitle = 'MMMM';
  yearTitle = 'YYYY';
  dayLabel = 'D';
  monthLabel = 'MMMM';
  yearLabel = 'YYYY';
  weekNumbers = 'w';
}
