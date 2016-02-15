import {Component, Self, Input} from 'angular2/core';
import {
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  ControlValueAccessor,
  NgModel
} from 'angular2/common';

// import * as moment from 'moment';
declare var moment:any;

import {DatePickerInner} from './datepicker-inner';
//import {DatePickerPopup} from './datepicker-popup';
import {DayPicker} from './daypicker';
import {MonthPicker} from './monthpicker';
import {YearPicker} from './yearpicker';

@Component({
  selector: 'datepicker[ngModel], [datepicker][ng-model]',
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
                      [shortcutPropagation]="shortcutPropagation">
      <daypicker tabindex="0"></daypicker>
      <monthpicker tabindex="0"></monthpicker>
      <yearpicker tabindex="0"></yearpicker>
    </datepicker-inner>
    `,
  directives: [DatePickerInner, DayPicker, MonthPicker, YearPicker, FORM_DIRECTIVES, CORE_DIRECTIVES]
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
  @Input() public shortcutPropagation:boolean;
  // todo: change type during implementation
  public customClass:any;
  // todo: change type during implementation
  @Input() public dateDisabled:any;

  constructor(@Self() public cd:NgModel) {
    // hack
    cd.valueAccessor = this;
  }

  private _now:Date = new Date();
  @Input() public get activeDate():Date {
    return this._activeDate || this._now;
  }

  public set activeDate(value:Date) {
    this._activeDate = value;
  }

  private onUpdate(event:any) {
    this.writeValue(event);
    this.cd.viewToModelUpdate(event);
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
