import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { BsDatePickerState } from '../common/bs-date-picker-state.provider';
import { BsDatePickerOptions } from '../common/bs-date-picker-options.provider';
import * as moment from 'moment';

@Component({
  selector: 'bs-month-picker',
  exportAs: 'bs-month-picker',
  template: `
<div class="bs-datepicker-head label-success">
  <button class="previous" (click)="viewPrev('years')"><span>&lsaquo;</span></button>
  <button class="current" (click)="viewMode('years')"><span>{{title}}</span></button>
  <button class="next" (click)="viewNext('years')"><span>&rsaquo;</span></button>
</div>
<div class="bs-datepicker-body">
  <table role="grid" class="months">
    <tbody>
    <tr *ngFor="let row of calendar">
      <td *ngFor="let month of row" role="gridcell"
          (click)="viewDate(month.date, {degrade: true})"
          (mouseenter)="activeDate(month.date)"
          (mouseleave)="activeDate()"
          [class.disabled]="month.isDisabled"
          [class.is-highlighted]="month.isHighlighted"
          [class.active]="month.isActive"
          [class.select-start]="month.isSelectionStart"
          [class.select-end]="month.isSelectionEnd"
          [class.selected]="month.isSelected">
        <span>{{month.label}}</span>
      </td>
    </tr>
    </tbody>
  </table>
</div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsMonthPickerComponent extends DatePickerBase {
  public calendar: any[][];
  public title: string;

  public constructor(datePickerService: BsDatePickerState, options: BsDatePickerOptions) {
    super(datePickerService, options);
  }

  public refresh(viewDate: moment.Moment): void {
    if (this.options.viewMode !== 'months') {
      return;
    }
    this.title = viewDate.format(this.options.format.yearTitle);
    this.calendar = this.getMonthsCalendarMatrix(viewDate);
  }
}
