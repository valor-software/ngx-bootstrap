import {Component, Self, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, ControlValueAccessor, NgModel} from 'angular2/common';
import {DatePickerInnerComponent} from './datepicker-inner.component';
import {DayPickerComponent} from './daypicker.component';
import {MonthPickerComponent} from './monthpicker.component';
import {YearPickerComponent} from './yearpicker.component';
// import {DatePickerPopup} from './datepicker-popup';

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
                      [templateUrl]="templateUrl"
                      [onlyCurrentMonth]="onlyCurrentMonth"
                      [shortcutPropagation]="shortcutPropagation">
      <daypicker tabindex="0"></daypicker>
      <monthpicker tabindex="0"></monthpicker>
      <yearpicker tabindex="0"></yearpicker>
    </datepicker-inner>
    `,
  directives: [DatePickerInnerComponent, DayPickerComponent, MonthPickerComponent, YearPickerComponent,
    FORM_DIRECTIVES, CORE_DIRECTIVES]
})
/* tslint:enable:component-selector-name component-selector-type */
export class DatePickerComponent implements ControlValueAccessor {
  @Input() public datepickerMode:string;
  @Input() public initDate:Date;
  @Input() public minDate:Date;
  @Input() public maxDate:Date;
  @Input() public minMode:string;
  @Input() public maxMode:string;
  @Input() public showWeeks:boolean;
  @Input() public formatDay:string;
  @Input() public formatMonth:string;
  @Input() public formatYear:string;
  @Input() public formatDayHeader:string;
  @Input() public formatDayTitle:string;
  @Input() public formatMonthTitle:string;
  @Input() public startingDay:number;
  @Input() public yearRange:number;
  @Input() public onlyCurrentMonth:boolean;
  @Input() public shortcutPropagation:boolean;
  @Input() public customClass:Array<{date:Date, mode:string, clazz:string}>;
// todo: change type during implementation
  @Input() public dateDisabled:any;

  public onChange:any = Function.prototype;
  public onTouched:any = Function.prototype;

  public cd:NgModel;
  private _now:Date = new Date();
  private _activeDate:Date;

  @Input()
  public get activeDate():Date {
    return this._activeDate || this._now;
  }

  public constructor(@Self() cd:NgModel) {
    this.cd = cd;
    // hack
    cd.valueAccessor = this;
  }

  public set activeDate(value:Date) {
    this._activeDate = value;
  }

  public onUpdate(event:any):void {
    this.writeValue(event);
    this.cd.viewToModelUpdate(event);
  }

  // todo: support null value
  public writeValue(value:any):void {
    // todo: fix something sends here new date all the time
    // if (value) {
    //  if (typeof value !== 'Date') {
    //    value = new Date(value);
    //  }
    //
    //  this.activeDate = value;
    // }
    if (value === this._activeDate) {
      return;
    }
    if (value && value instanceof Date) {
      this.activeDate = value;
      return;
    }

    this.activeDate = value ? new Date(value) : void 0;
  }

  public registerOnChange(fn:(_:any) => {}):void { this.onChange = fn; }

  public registerOnTouched(fn:() => {}):void { this.onTouched = fn; }
}
