import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  Provider,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerInnerComponent } from './datepicker-inner.component';
import { DatepickerConfig } from './datepicker.config';

export const DATEPICKER_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line: no-use-before-declare */
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

/* tslint:disable:component-selector-name component-selector-type */
@Component({
  selector: 'datepicker',
  template: `
    <datepicker-inner [activeDate]="activeDate"
                      (update)="onUpdate($event)"
                      [locale]="config.locale"
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
                      [dayDisabled]="dayDisabled"
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
  @Input() datepickerMode = 'day';
  /** default date to show if `ng-model` value is not specified */
  @Input() initDate: Date;
  /**  oldest selectable date */
  @Input() minDate: Date;
  /** latest selectable date */
  @Input() maxDate: Date;
  /** set lower datepicker mode, supports: `day`, `month`, `year` */
  @Input() minMode: string;
  /** sets upper datepicker mode, supports: `day`, `month`, `year` */
  @Input() maxMode: string;
  /** if false week numbers will be hidden */
  @Input() showWeeks = true;
  /** format of day in month */
  @Input() formatDay: string;
  /** format of month in year */
  @Input() formatMonth: string;
  /** format of year in year range */
  @Input() formatYear: string;
  /** format of day in week header */
  @Input() formatDayHeader: string;
  /** format of title when selecting day */
  @Input() formatDayTitle: string;
  /** format of title when selecting month */
  @Input() formatMonthTitle: string;
  /** starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday) */
  @Input() startingDay: number;
  /** number of years displayed in year selection */
  @Input() yearRange: number;
  /** if true only dates from the currently displayed month will be shown */
  @Input() onlyCurrentMonth: boolean;
  /** if true shortcut`s event propagation will be disabled */
  @Input() shortcutPropagation: boolean;
  /** number of months displayed in a single row of month picker */
  @Input() monthColLimit: number;
  /** number of years displayed in a single row of year picker */
  @Input() yearColLimit: number;
  /** array of custom css classes to be applied to targeted dates */
  @Input() customClass: { date: Date; mode: string; clazz: string }[];
  /** array of disabled dates */
  @Input() dateDisabled: { date: Date; mode: string }[];
  /** disabled days of the week from 0-6 (0=Sunday, ..., 6=Saturday) */
  @Input() dayDisabled: number[];

  /** currently active date */
  @Input()
  get activeDate(): Date {
    return this._activeDate || this._now;
  }

  set activeDate(value: Date) {
    this._activeDate = value;
  }

  @Output()
  selectionDone: EventEmitter<Date> = new EventEmitter<Date>(undefined);

  /** callback to invoke when the activeDate is changed. */
  @Output()
  activeDateChange: EventEmitter<Date> = new EventEmitter<Date>(
    undefined
  );

  @ViewChild(DatePickerInnerComponent, { static: true })
  _datePicker: DatePickerInnerComponent;

  /* tslint:disable-next-line: no-any*/
  onChange: any = Function.prototype;
  /* tslint:disable-next-line: no-any*/
  onTouched: any = Function.prototype;

  config: DatepickerConfig;

  protected _now: Date = new Date();
  protected _activeDate: Date;

  constructor(config: DatepickerConfig) {
    this.config = config;
    this.configureOptions();
  }

  configureOptions(): void {
    Object.assign(this, this.config);
  }

  onUpdate(event: Date): void {
    this.activeDate = event;
    this.onChange(event);
  }

  onSelectionDone(event: Date): void {
    this.selectionDone.emit(event);
  }

  onActiveDateChange(event: Date): void {
    this.activeDateChange.emit(event);
  }
  // todo: support null value
  /* tslint:disable-next-line: no-any*/
  writeValue(value: any): void {
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

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
