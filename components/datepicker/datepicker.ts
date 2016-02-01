import {
  Component, View, Host,
  EventEmitter,
  ElementRef, ViewContainerRef,
  Self, Renderer,
  QueryList, Query,
  Input
} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES,
  ControlValueAccessor, NgIf, NgClass, NgModel
} from 'angular2/common';

import * as moment from 'moment';

import {DatePickerInner} from './datepicker-inner';
import {DatePickerPopup} from './datepicker-popup';
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
  @Input() private datepickerMode:string;
  @Input() private initDate:Date;
  @Input() private minDate:Date;
  @Input() private maxDate:Date;
  @Input() private minMode:string;
  @Input() private maxMode:string;
  @Input() private showWeeks:boolean;
  @Input() private formatDay:string;
  @Input() private formatMonth:string;
  @Input() private formatYear:string;
  @Input() private formatDayHeader:string;
  @Input() private formatDayTitle:string;
  @Input() private formatMonthTitle:string;
  @Input() private startingDay:number;
  @Input() private yearRange:number;
  @Input() private shortcutPropagation:boolean;
  // todo: change type during implementation
  private customClass:any;
  // todo: change type during implementation
  @Input() private dateDisabled:any;
  private templateUrl:string;

  constructor(@Self() public cd:NgModel) {
    // hack
    cd.valueAccessor = this;
  }

  @Input() public get activeDate():Date {
    return this._activeDate;
  }

  public set activeDate(value:Date) {
    this._activeDate = value;
    this.cd.viewToModelUpdate(moment(this.activeDate).toDate());
  }

  private onUpdate(event:any) {
    this.writeValue(event);
  }

  writeValue(value:any) {
    // todo: fix something sends here new date all the time
    console.log(value);
    // if (value) {
    //  if (typeof value !== 'Date') {
    //    value = new Date(value);
    //  }
    //
    //  this.activeDate = value;
    // }
    if (value === this.activeDate) {
      return;
    }
    if (value && value instanceof Date) {
      this.activeDate = value;
      return;
    }
    this.activeDate = value ? new Date(value) : null;

  }

  onChange = (_:any) => {};
  onTouched = () => {};

  registerOnChange(fn:(_:any) => {}):void {
    this.onChange = fn;
  }

  registerOnTouched(fn:() => {}):void {
    this.onTouched = fn;
  }

}
