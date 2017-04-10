import { Component, EventEmitter, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerInnerComponent } from './datepicker-inner.component';
import { DatepickerConfig } from './datepicker.config';

export const DATEPICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

/* tslint:disable:component-selector-name component-selector-type */
@Component({
  selector: 'datepicker',
  template: `
    <datepicker-inner [activeDate]="activeDate"
                      (update)="onUpdate($event)"
                      [datepickerMode]="datepickerMode"
                      [initDate]="initDate"
                      [minDate]="minDate"
                      [maxDate]="maxDate"
                      [minMode]="minMode"
                      [maxMode]="maxMode"
                      [showWeeks]="showWeeks"
                      [formatDay]="formatDay"
                      [formatMonth]="formatMonth"
                      [formatYear]="formatYear"
                      [formatDayHeader]="formatDayHeader"
                      [formatDayTitle]="formatDayTitle"
                      [formatMonthTitle]="formatMonthTitle"
                      [startingDay]="startingDay"
                      [yearRange]="yearRange"
                      [customClass]="customClass"
                      [dateDisabled]="dateDisabled"
                      [onlyCurrentMonth]="onlyCurrentMonth"
                      [shortcutPropagation]="shortcutPropagation"
                      [monthColLimit]="monthColLimit"
                      [yearColLimit]="yearColLimit"
                      (selectionDone)="onSelectionDone($event)"
                      (activeDateChange)="onActiveDateChange($event)">
      <daypicker tabindex="0"></daypicker>
      <monthpicker tabindex="0"></monthpicker>
      <yearpicker tabindex="0"></yearpicker>
    </datepicker-inner>
    `,
  providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR]
})
/* tslint:enable:component-selector-name component-selector-type */
export class DatePickerComponent implements ControlValueAccessor {
  /** sets datepicker mode, supports: `day`, `month`, `year` */
  @Input() public datepickerMode: string = 'day';
  /** default date to show if `ng-model` value is not specified */
  @Input() public initDate: Date;
  /**  oldest selectable date */
  @Input() public minDate: Date;
  /** latest selectable date */
  @Input() public maxDate: Date;
  /** set lower datepicker mode, supports: `day`, `month`, `year` */
  @Input() public minMode: string;
  /** sets upper datepicker mode, supports: `day`, `month`, `year` */
  @Input() public maxMode: string;
  /** if false week numbers will be hidden */
  @Input() public showWeeks: boolean = true;
  /** format of day in month */
  @Input() public formatDay: string;
  /** format of month in year */
  @Input() public formatMonth: string;
  /** format of year in year range */
  @Input() public formatYear: string;
  /** format of day in week header */
  @Input() public formatDayHeader: string;
  /** format of title when selecting day */
  @Input() public formatDayTitle: string;
  /** format of title when selecting month */
  @Input() public formatMonthTitle: string;
  /** starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday) */
  @Input() public startingDay: number;
  /** number of years displayed in year selection */
  @Input() public yearRange: number;
  /** if true only dates from the currently displayed month will be shown */
  @Input() public onlyCurrentMonth: boolean;
  /** if true shortcut`s event propagation will be disabled */
  @Input() public shortcutPropagation: boolean;
  /** number of months displayed in a single row of month picker */
  @Input() public monthColLimit: number;
  /** number of years displayed in a single row of year picker */
  @Input() public yearColLimit: number;
  /** array of custom css classes to be applied to targeted dates */
  @Input() public customClass: { date: Date, mode: string, clazz: string }[];
  /** array of disabled dates */
  @Input() public dateDisabled: { date: Date, mode: string }[];

  /** currently active date */
  @Input()
  public get activeDate(): Date {
    return this._activeDate || this._now;
  }

  public set activeDate(value: Date) {
    this._activeDate = value;
  }

  @Output() public selectionDone: EventEmitter<Date> = new EventEmitter<Date>(undefined);

  /** callback to invoke when the activeDate is changed. */
  @Output() public activeDateChange: EventEmitter<Date> = new EventEmitter<Date>(undefined);

  @ViewChild(DatePickerInnerComponent) public _datePicker: DatePickerInnerComponent;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  protected _now: Date = new Date();
  protected _activeDate: Date;
  protected config: DatepickerConfig;

  public constructor(config: DatepickerConfig) {
    this.config = config;
    this.configureOptions();
  }

  public configureOptions(): void {
    Object.assign(this, this.config);
  }

  public onUpdate(event: any): void {
    this.activeDate = event;
    this.onChange(event);
  }

  public onSelectionDone(event: Date): void {
    this.selectionDone.emit(event);
  }

  public onActiveDateChange(event: Date): void {
    this.activeDateChange.emit(event);
  }
  // todo: support null value
  public writeValue(value: any): void {
    if (this._datePicker.compare(value, this._activeDate) === 0) {
      return;
    }
    if (value && value instanceof Date) {
      this.activeDate = value;
      this._datePicker.select(value, false);
      return;
    }

    this.activeDate = value ? new Date(value) : void 0;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
