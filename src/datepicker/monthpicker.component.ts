// @deprecated
// tslint:disable
import { Component, OnInit } from '@angular/core';

import { isBs3 } from '../utils/theme-provider';
import { DatePickerInnerComponent } from './datepicker-inner.component';

@Component({
  selector: 'monthpicker',
  template: `
<table *ngIf="datePicker.datepickerMode==='month'" role="grid">
  <thead>
    <tr>
      <th>
        <button type="button" class="btn btn-default btn-sm pull-left float-left"
                (click)="datePicker.move(-1)" tabindex="-1">‹</button></th>
      <th [attr.colspan]="((datePicker.monthColLimit - 2) <= 0) ? 1 : datePicker.monthColLimit - 2">
        <button [id]="datePicker.uniqueId + '-title'"
                type="button" class="btn btn-default btn-sm"
                (click)="datePicker.toggleMode(0)"
                [disabled]="datePicker.datepickerMode === maxMode"
                [ngClass]="{disabled: datePicker.datepickerMode === maxMode}" tabindex="-1" style="width:100%;">
          <strong>{{ title }}</strong> 
        </button>
      </th>
      <th>
        <button type="button" class="btn btn-default btn-sm pull-right float-right"
                (click)="datePicker.move(1)" tabindex="-1">›</button>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let rowz of rows">
      <td *ngFor="let dtz of rowz" class="text-center" role="gridcell" [attr.id]="dtz.uid" [ngClass]="dtz.customClass">
        <button type="button" style="min-width:100%;" class="btn btn-default"
                [ngClass]="{'btn-link': isBs4 && !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected || (isBs4 && !dtz.selected && datePicker.isActive(dtz)), disabled: dtz.disabled, active: !isBs4 && datePicker.isActive(dtz)}"
                [disabled]="dtz.disabled"
                (click)="datePicker.select(dtz.date)" tabindex="-1">
          <span [ngClass]="{'text-success': isBs4 && dtz.current, 'text-info': !isBs4 && dtz.current}">{{ dtz.label }}</span>
        </button>
      </td>
    </tr>
  </tbody>
</table>
  `,
  styles: [
    `
    :host .btn-info .text-success {
      color: #fff !important;
    }
  `
  ]
})
export class MonthPickerComponent implements OnInit {
  title: string;
  rows: any[] = [];
  datePicker: DatePickerInnerComponent;
  maxMode: string;

  constructor(datePicker: DatePickerInnerComponent) {
    this.datePicker = datePicker;
  }

  get isBs4(): boolean {
    return !isBs3();
  }

  ngOnInit(): void {
    const self = this;

    this.datePicker.stepMonth = { years: 1 };

    this.datePicker.setRefreshViewHandler(function(): void {
      const months: any[] = new Array(12);
      const year: number = this.activeDate.getFullYear();
      let date: Date;

      for (let i = 0; i < 12; i++) {
        date = new Date(year, i, 1);
        date = this.fixTimeZone(date);
        months[i] = this.createDateObject(date, this.formatMonth);
        months[i].uid = this.uniqueId + '-' + i;
      }

      self.title = this.dateFilter(this.activeDate, this.formatMonthTitle);
      self.rows = this.split(months, self.datePicker.monthColLimit);
    }, 'month');

    this.datePicker.setCompareHandler(function(
      date1: Date,
      date2: Date
    ): number {
      const d1 = new Date(date1.getFullYear(), date1.getMonth());
      const d2 = new Date(date2.getFullYear(), date2.getMonth());
      return d1.getTime() - d2.getTime();
    }, 'month');

    this.datePicker.refreshView();
  }

  // todo: key events implementation
}
