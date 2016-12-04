import {
  Component, EventEmitter, Input, Output, Self, ViewChild
} from '@angular/core';
import { DatePickerInnerComponent } from './datepicker-inner.component';
import { ControlValueAccessor, NgModel } from '@angular/forms';
import { DatepickerConfig } from './datepicker.config';

/* tslint:disable:component-selector-name component-selector-type */
@Component({
  selector: 'datepicker[ngModel]',
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
                      (selectionDone)="onSelectionDone($event)">
      <daypicker tabindex="0"></daypicker>
      <monthpicker tabindex="0"></monthpicker>
      <yearpicker tabindex="0"></yearpicker>
    </datepicker-inner>
    `,
  providers: [NgModel]
})
/* tslint:enable:component-selector-name component-selector-type */
export class DatePickerComponent implements ControlValueAccessor {
  @Input() public datepickerMode: string;
  @Input() public initDate: Date;
  @Input() public minDate: Date;
  @Input() public maxDate: Date;
  @Input() public minMode: string;
  @Input() public maxMode: string;
  @Input() public showWeeks: boolean;
  @Input() public formatDay: string;
  @Input() public formatMonth: string;
  @Input() public formatYear: string;
  @Input() public formatDayHeader: string;
  @Input() public formatDayTitle: string;
  @Input() public formatMonthTitle: string;
  @Input() public startingDay: number;
  @Input() public yearRange: number;
  @Input() public onlyCurrentMonth: boolean;
  @Input() public shortcutPropagation: boolean;
  @Input() public customClass: {date: Date, mode: string, clazz: string}[];
  @Input() public monthColLimit: number;
  @Input() public yearColLimit: number;
  @Input() public dateDisabled: {date: Date, mode: string}[];

  @Input()
  public get activeDate(): Date {
    return this._activeDate || this._now;
  }

  public set activeDate(value: Date) {
    this._activeDate = value;
  }

  @Output() public selectionDone: EventEmitter<Date> = new EventEmitter<Date>(undefined);

  @ViewChild(DatePickerInnerComponent) public _datePicker: DatePickerInnerComponent;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  public cd: NgModel;
  protected _now: Date = new Date();
  protected _activeDate: Date;
  protected config: DatepickerConfig;

  public constructor(@Self() cd: NgModel, config: DatepickerConfig) {
    this.config = config;
    this.cd = cd;
    // hack
    cd.valueAccessor = this;
    this.configureOptions();
  }

  public configureOptions(): void {
    Object.assign(this, this.config);
  }

  public onUpdate(event: any): void {
    this.cd.viewToModelUpdate(event);
  }

  public onSelectionDone(event: Date): void {
    this.selectionDone.emit(event);
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
