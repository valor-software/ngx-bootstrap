import { Component } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { BsDatePickerState } from '../common/bs-date-picker-state.provider';
import { BsDatePickerOptions } from '../common/bs-date-picker-options.provider';
import { BsCalendarOptionsClass } from '../common/bs-calendar-options.provider';
import * as moment from 'moment';

@Component({
  selector: 'bs-current-date',
  exportAs: 'bs-current-date',
  template: `
<div *ngIf="isShown" class="current-timedate">
  <span>{{title}}</span>
</div>
`
})
export class BsCurrentDateComponent extends DatePickerBase {
  public title: string;
  public isShown: boolean = true;
  private cOptions: BsCalendarOptionsClass;

  public constructor(datePickerState: BsDatePickerState, options: BsDatePickerOptions, cOptions: BsCalendarOptionsClass) {
    super(datePickerState, options);
    this.cOptions = cOptions;
    this.subscriptions.push(datePickerState.selectedDateChange.subscribe(() => this.refresh()));
    this.subscriptions.push(datePickerState.activeDateChange.subscribe(() => this.refresh()));
    this.subscriptions.push(options.onUpdate.subscribe(() => this.refresh()));
  }

  public refresh(): void {
    if (!this.cOptions) {
      return;
    }

    if (!this.options.ui.showCurrentDate) {
      this.isShown = false;
      return;
    }
    // todo: add support of timepicker enabled/disabled
    // todo: add support of min view mode
    const active = this.datePickerState.activeDate;
    const selected = this.datePickerState.selectedDate;
    const selectedEnd = this.datePickerState.selectedEndDate;

    if (this.options.isDatePicker) {
      this.title = this.getTitle(active || selected);
      return;
    }

    if (this.options.isDateRangePicker) {
      if (this.cOptions.isLeft) {
        // if selection end date not selected - show selection start or active date
        // if selection end date selected - show selection start date
        this.title = this.getTitle(!selectedEnd ? (selected || active) : (active || selected));
      }

      if (this.cOptions.isRight) {
        // if no selection start - show empty current date title
        // if start date selected - show active date
        // until range end is not selected - than show range end date
        this.title = selected ? this.getTitle(selectedEnd || active) : '';
      }
    }
  }

  public getTitle(date: moment.Moment): string {
    if (!date) {
      return '';
    }
    return moment(date).format(this.options.format.currentDate);
  }
}
