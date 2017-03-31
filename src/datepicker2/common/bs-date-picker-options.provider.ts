import * as moment from 'moment';
import { Injectable, EventEmitter } from '@angular/core';

export const DatePickerViewModes: { [key: string]: number, days: number, months: number, years: number }
  = {days: 0, months: 1, years: 2};
export type BsDatePickerViewMode = 'days' | 'months' | 'years';

export interface DatePickerCustomDates {
  /** Any parse-able date format (new Date(), moment(), string, number) */
  date: any;

  /** css classes which will be applied to date,
   * read more about available options in NgClass description
   */
  css?: string | string[] | Object;

  /** should this date be disabled */
  isDisabled?: boolean;
}

export interface DatePickerDateOptions {
  /** minimum available date */
  min: any;
  /** maximum available date */
  max: any;
  /** initially viewed, not selected, date if value is not set */
  initial: any;
  /** initially selected date, if value is not set, in date picker mode */
  selected: any;
  /** initially selected end date in date range picker mode */
  selectedEnd: any;
}

export class DatePickerFormatOptions {
  /** day format in calendar */
  public day: string = 'D';
  /** month format in calendar */
  public month: string = 'MMM';
  /** year format in calendar */
  public year: string = 'YYYY';
  /** weekdays format in calendar */
  public weekday: string = 'dd';
  // /** format of title when at days calendar */
  // dayTitle:string;
  /** format of month in title */
  public monthTitle: string = 'MMMM';
  /** format of year in title */
  public yearTitle: string = 'YYYY';
  /** current date format */
  public currentDate: string = 'LLL';
}

export class DatePickerUiOptions {
  /** show localized week numbers at the start of each week on the calendars */
  public showWeekNumbers: boolean = true;
  /** show ISO week numbers at the start of each week on the calendars */
  public showISOWeekNumbers: boolean = false;
  /** enables current date under calendar */
  public showCurrentDate: boolean = true;
  /** if `true` label `Custom Ranges` will be shown if `ranges` are defined */
  public showCustomRangeLabel: boolean = true;
  /** if `false` and one of ranges is selected, calendar will be hidden */
  public alwaysShowCalendars: boolean = false;
  /** lower level of view mode */
  public minMode: BsDatePickerViewMode = 'days';
  /** upper level of view mode */
  public maxMode: BsDatePickerViewMode = 'years';
  /** number of columns displayed in month selection mode */
  public monthColumns: number = 3;
  /** number of columns displayed in year selection mode */
  public yearRows: number = 4;
  /** number of rows displayed in year selection mode */
  public yearColumns: number = 5;
  public dayColums: number = 6;
  public dayRows: number = 7;
}

export class DatePickerLocale {
  /** locale name */
  public name: string = 'en';
  public isRtl: boolean = false;
  public close: string = 'Close';
  public apply: string = 'Apply';
  public reset: string = 'Reset';
  public customRange: string = 'Custom Range';
}

export class TimePickerOptions {
  public hoursInc: number = 1;
  /** increment of the minutes selection list for times (i.e. 30 to allow only selection of times ending in 0 or 30) */
  public minutesInc: number = 10;
  /** use 24-hour instead of 12-hour times, removing the AM/PM selection */
  public showAmPm: boolean = true;
}

@Injectable()
export class BsDatePickerOptions {
  /** current date picker mode */
  public mode: 'date' | 'daterange' = 'date';
  /** current date picker view mode (if supported) */
  public viewMode: BsDatePickerViewMode = 'days';

  public ui: DatePickerUiOptions = new DatePickerUiOptions();
  public date: DatePickerDateOptions = {} as DatePickerDateOptions;
  public format: DatePickerFormatOptions = new DatePickerFormatOptions();
  public locale: string | DatePickerLocale = 'en';
  public timepicker: TimePickerOptions = new TimePickerOptions();

  public customDates: DatePickerCustomDates[];
  /** predefined set of ranges {'today': [moment(), moment()]} */
  public ranges: { [key: string]: moment.Moment[]|string[]|Date[] };

  public onUpdate: EventEmitter<BsDatePickerOptions> = new EventEmitter();

  // public static setDefaults(options: any): void {
  //   Object.assign(defaults, options);
  // }

  public update(options: any): BsDatePickerOptions {
    const {mode, viewMode, ui, date, format, locale, timepicker, customDates, ranges} = options;
    if (mode && (mode === 'date' || mode === 'daterange')) {
      this.mode = mode;
    }

    if (viewMode && viewMode in DatePickerViewModes) {
      this.viewMode = viewMode;
    }

    // UI options
    if (ui) {
      // mini maxy view modes
      if (ui.minMode in DatePickerViewModes) {
        this.ui.minMode = ui.minMode;
      }

      if (ui.maxMode in DatePickerViewModes) {
        if (DatePickerViewModes[this.ui.maxMode] > DatePickerViewModes[this.ui.minMode]) {
          this.ui.maxMode = ui.maxMode;
        } else {
          this.ui.maxMode = this.ui.minMode;
        }
      }

      // if view mode is lesser than min -> fix view mode
      if (DatePickerViewModes[this.ui.minMode] > DatePickerViewModes[this.viewMode]) {
        this.viewMode = this.ui.minMode;
      }

      // if view mode is gt than max -> fix view mode
      if (DatePickerViewModes[this.ui.maxMode] < DatePickerViewModes[this.viewMode]) {
        this.viewMode = this.ui.maxMode;
      }

      if (typeof ui.showWeekNumbers !== 'undefined') {
        this.ui.showWeekNumbers = !!ui.showWeekNumbers;
      }

      if (typeof ui.showCurrentDate !== 'undefined') {
        this.ui.showCurrentDate = !!ui.showCurrentDate;
      }

      if (typeof ui.showCustomRangeLabel !== 'undefined') {
        this.ui.showCustomRangeLabel = !!ui.showCustomRangeLabel;
      }

      if (typeof ui.alwaysShowCalendars !== 'undefined') {
        this.ui.alwaysShowCalendars = !!ui.alwaysShowCalendars;
      }

      // this.ui = Object.assign({}, this.ui, ui);
    }

    // Ranges options
    if (ranges) {
      this.ranges = ranges;
    }

    // Timepicker options
    if (timepicker) {
      if (typeof timepicker.showAmPm === 'boolean') {
        this.timepicker.showAmPm = timepicker.showAmPm;
      }
    }

    if (format) {
      this.format = Object.assign({}, this.format, format);
    }

    // Object.assign(this, options);
    this.onUpdate.emit(this);
    return this;
  }

  public get isDatePicker(): boolean {
    return this.mode === 'date';
  }

  public get isDateRangePicker(): boolean {
    return this.mode === 'daterange';
  }
}
