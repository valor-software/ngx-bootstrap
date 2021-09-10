// @deprecated
import { Component, OnInit } from '@angular/core';

import { isBs3 } from 'ngx-bootstrap/utils';
import { DatePickerInnerComponent } from './datepicker-inner.component';

@Component({
  selector: 'yearpicker',
  template: `
    <table *ngIf="datePicker.datepickerMode==='year'" role='grid'>
      <thead>
      <tr>
        <th>
          <button type='button' class='btn btn-default btn-sm pull-left float-left'
                  (click)='datePicker.move(-1)' tabindex='-1'>‹
          </button>
        </th>
        <th [attr.colspan]='((datePicker.yearColLimit - 2) <= 0) ? 1 : datePicker.yearColLimit - 2'>
          <button [id]="datePicker.uniqueId + '-title'" role='heading'
                  type='button' class='btn btn-default btn-sm'
                  (click)='datePicker.toggleMode(0)'
                  [disabled]='datePicker.datepickerMode === datePicker.maxMode'
                  [ngClass]='{disabled: datePicker.datepickerMode === datePicker.maxMode}' tabindex='-1'
                  style='width:100%;'>
            <strong>{{ title }}</strong>
          </button>
        </th>
        <th>
          <button type='button' class='btn btn-default btn-sm pull-right float-right'
                  (click)='datePicker.move(1)' tabindex='-1'>›
          </button>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor='let rowz of rows'>
        <td *ngFor='let dtz of rowz' class='text-center' role='gridcell' [attr.id]='dtz.uid'>
          <button type='button' style='min-width:100%;' class='btn btn-default'
                  [ngClass]="{'btn-link': isBs4 && !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected || (isBs4 && !dtz.selected && datePicker.isActive(dtz)), disabled: dtz.disabled, active: !isBs4 && datePicker.isActive(dtz)}"
                  [disabled]='dtz.disabled'
                  (click)='datePicker.select(dtz.date)' tabindex='-1'>
            <span
              [ngClass]="{'text-success': isBs4 && dtz.current, 'text-info': !isBs4 && dtz.current}">{{ dtz.label }}</span>
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
export class YearPickerComponent implements OnInit {
  datePicker: DatePickerInnerComponent;
  title?: string;
  rows = [];

  constructor(datePicker: DatePickerInnerComponent) {
    this.datePicker = datePicker;
  }

  get isBs4(): boolean {
    return !isBs3();
  }

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    this.datePicker.stepYear = { years: this.datePicker.yearRange };

    this.datePicker.setRefreshViewHandler(function(): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      const years = new Array(that.yearRange);
      let date: Date;
      const start = self.getStartingYear(that.activeDate.getFullYear()) || 0;

      for (let i = 0; i < that.yearRange; i++) {
        date = new Date(start + i, 0, 1);
        date = that.fixTimeZone(date);
        years[i] = that.createDateObject(date, that.formatYear);
        years[i].uid = that.uniqueId + '-' + i;
      }

      self.title = [years[0].label, years[that.yearRange - 1].label].join(
        ' - '
      );
      self.rows = that.split(years, self.datePicker.yearColLimit);
    }, 'year');

    this.datePicker.setCompareHandler(function(
      date1: Date,
      date2: Date
    ): number {
      return date1.getFullYear() - date2.getFullYear();
    }, 'year');

    this.datePicker.refreshView();
  }

  protected getStartingYear(year: number): number | undefined {
    // todo: parseInt
    if (this.datePicker && this.datePicker.yearRange) {
      return (
        (year - 1) / this.datePicker.yearRange * this.datePicker.yearRange + 1
      );
    }
    return undefined;
  }
}
