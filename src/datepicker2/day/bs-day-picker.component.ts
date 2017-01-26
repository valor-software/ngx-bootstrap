import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { BsDatePickerState } from '../common/bs-date-picker-state.provider';
import { BsDatePickerOptions } from '../common/bs-date-picker-options.provider';
import { DatePickerDate } from '../common/date-picker-date.class';
import * as moment from 'moment';
import { BsCalendarOptionsClass } from '../common/bs-calendar-options.provider';

@Component({
  selector: 'bs-day-picker',
  exportAs: 'bs-day-picker',
  template: `
<div ></div>
<div class="bs-datepicker-head label-success">
  <button class="previous" (click)="viewPrev('months')"><span>&lsaquo;</span></button>
  <button class="current" (click)="viewMode('months')"><span>{{viewMonth}}</span></button>
  <button class="current" (click)="viewMode('years')"><span>{{viewYear}}</span></button>
  <button class="next" (click)="viewNext('months')"><span>&rsaquo;</span></button>
</div>
<div class="bs-datepicker-body">

  <table role="grid" class="days weeks">
    <thead>
    <tr>
      <th *ngIf="options.ui.showWeekNumbers"></th><!--if show weeks-->
      <th *ngFor="let weekday of locale.weekdays; let i = index" aria-label="weekday">{{locale.weekdaysShort[i]}}</th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let week of calendar; let i = index">
      <td class="week" *ngIf="options.ui.showWeekNumbers"><span>{{ weeks[i] }}</span></td>
      <td *ngFor="let day of week" role="gridcell"
          (click)="selectDate(day.date)" (mouseenter)="activeDate(day.date)" (mouseleave)="activeDate()"
          [class.disabled]="day.isDisabled"
          [class.is-highlighted]="day.isHighlighted"
          [class.is-other-month]="day.isOtherMonth"
          [class.active]="day.isActive"
          [class.select-start]="day.isSelectionStart"
          [class.select-end]="day.isSelectionEnd"
          [class.selected]="day.isSelected">
        <span>{{day.label}}</span>
      </td>
    </tr>
    </tbody>
  </table>
</div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsDayPickerComponent extends DatePickerBase {
  // days matrix
  public calendar: DatePickerDate[][];
  // title in the head
  public viewMonth: string;
  public viewYear: string;
  // weeks numbers
  public weeks: number[];

  // locale options
  public locale: any;

  private cOptions: BsCalendarOptionsClass;

  public constructor(datePickerState: BsDatePickerState, options: BsDatePickerOptions, cOptions: BsCalendarOptionsClass) {
    super(datePickerState, options);
    this.cOptions = cOptions;
    this.refresh(datePickerState.viewDate);
  }

  public refresh(_viewDate: any): void {
    if (!this.cOptions) {
      return;
    }

    if (this.options.viewMode !== 'days') {
      return;
    }

    let viewDate = _viewDate;
    if (this.cOptions.isRight) {
      viewDate = _viewDate.clone().add(this.cOptions.offset, 'months');
    }

    this.calendar = this.getDaysCalendarMatrix(viewDate);
    this.weeks = this.getWeeksNumbers(viewDate);
    this.locale = this.getLocale();
    this.viewMonth = moment(viewDate).format(this.options.format.monthTitle);
    this.viewYear = moment(viewDate).format(this.options.format.yearTitle);
  }
}
