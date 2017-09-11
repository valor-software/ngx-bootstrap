import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { BsDatePickerState } from '../common/bs-date-picker-state.provider';
import { BsDatePickerOptions } from '../common/bs-date-picker-options.provider';
import * as moment from 'moment';

@Component({
  selector: 'bs-year-picker',
  exportAs: 'bs-year-picker',
  template: `
<div class="bs-datepicker-head label-success">
  <button class="previous" (click)="viewPrev('years', yearsStep)"><span>&lsaquo;</span></button>
  <button class="current"><span>{{title}}</span></button>
  <button class="next" (click)="viewNext('years', yearsStep)"><span>&rsaquo;</span></button>
</div>
<div class="bs-datepicker-body">
  <table role="grid" class="years">
    <tbody>
    <tr *ngFor="let yearsRow of calendar">
      <td *ngFor="let year of yearsRow" role="gridcell"
          (click)="viewDate(year.date, {degrade: true})"
          (mouseenter)="activeDate(year.date)"
          (mouseleave)="activeDate()"
          [class.disabled]="year.isDisabled"
          [class.is-highlighted]="year.isHighlighted"
          [class.active]="year.isActive"
          [class.select-start]="year.isSelectionStart"
          [class.select-end]="year.isSelectionEnd"
          [class.selected]="year.isSelected">
        <span>{{year.label}}</span>
      </td>
    </tr>
    </tbody>
  </table>
</div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsYearPickerComponent extends DatePickerBase {
  public title: string;
  public calendar: any;

  public get yearsStep(): number {
    return this.options
      ? this.options.ui.yearRows * this.options.ui.yearColumns
      : 5;
  }

  public constructor(
    datePickerService: BsDatePickerState,
    options: BsDatePickerOptions
  ) {
    super(datePickerService, options);
    this.subscriptions.push(
      datePickerService.selectedDateChange.subscribe(() => {
        this.refresh(datePickerService.viewDate);
      })
    );
  }

  public refresh(viewDate: any): void {
    if (this.options.viewMode !== 'years') {
      return;
    }

    const yearsStep = this.options.ui.yearColumns * this.options.ui.yearRows;
    const yearStart = this.getStartingYear(viewDate.year());
    const yearEnd = yearStart + yearsStep;
    this.title = [
      moment()
        .year(yearStart)
        .format(this.options.format.yearTitle),
      moment()
        .year(yearEnd)
        .format(this.options.format.yearTitle)
    ].join(' - ');
    this.calendar = this.getYearsCalendarMatrix(viewDate);
  }
}
