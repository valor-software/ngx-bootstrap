import {Component, Self, Input, forwardRef, Provider} from 'angular2/core';
import {
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  ControlValueAccessor, NG_VALUE_ACCESSOR
} from 'angular2/common';
import {CONST_EXPR} from 'angular2/src/facade/lang';

import {DatePickerInner} from './datepicker-inner';
//import {DatePickerPopup} from './datepicker-popup';
import {DayPicker} from './daypicker';
import {MonthPicker} from './monthpicker';
import {YearPicker} from './yearpicker';

const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(NG_VALUE_ACCESSOR,
  { useExisting: forwardRef(() => DatePicker), multi: true }));

@Component({
  selector: 'datepicker, [datepicker]',
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
  directives: [DatePickerInner, DayPicker, MonthPicker, YearPicker, FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers:[CUSTOM_VALUE_ACCESSOR]
})

export class DatePicker implements ControlValueAccessor {
  private _activeDate:Date;
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
  @Input() public get activeDate():Date {
    return this._activeDate || this._now;
  }
  // todo: change type during implementation
  @Input() public dateDisabled:any;

  constructor() {
  }

  private _now:Date = new Date();

  public set activeDate(value:Date) {
    this._activeDate = value;
  }

  private onUpdate(event:any) {
    this.writeValue(event);
    this.onChange(event);
  }

  // todo: support null value
  writeValue(value:any) {
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

    this.activeDate = value ? new Date(value) : null;
  }

  onChange = (_:any) => {
  };
  onTouched = () => {
  };

  registerOnChange(fn:(_:any) => {}):void {
    this.onChange = fn;
  }

  registerOnTouched(fn:() => {}):void {
    this.onTouched = fn;
  }
}
