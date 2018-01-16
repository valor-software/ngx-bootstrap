// @deprecated
// tslint:disable
import { Component, OnInit } from '@angular/core';
import { isBs3 } from '../utils/theme-provider';
import { DatePickerInnerComponent } from './datepicker-inner.component';

@Component({
  selector: 'daypicker',
  template: `
<table *ngIf="datePicker.datepickerMode === 'day'" role="grid" [attr.aria-labelledby]="datePicker.uniqueId + '-title'" aria-activedescendant="activeDateId">
  <thead>
    <tr>
      <th>
        <button *ngIf="!isBs4"
                type="button"
                class="btn btn-default btn-secondary btn-sm pull-left float-left"
                (click)="datePicker.move(-1)"
                tabindex="-1">‹</button>
        <button *ngIf="isBs4"
                type="button"
                class="btn btn-default btn-secondary btn-sm pull-left float-left"
                (click)="datePicker.move(-1)"
                tabindex="-1">&lt;</button>
      </th>
      <th [attr.colspan]="5 + (datePicker.showWeeks ? 1 : 0)">
        <button [id]="datePicker.uniqueId + '-title'"
                type="button" class="btn btn-default btn-secondary btn-sm"
                (click)="datePicker.toggleMode(0)"
                [disabled]="datePicker.datepickerMode === datePicker.maxMode"
                [ngClass]="{disabled: datePicker.datepickerMode === datePicker.maxMode}" tabindex="-1" style="width:100%;">
          <strong>{{ title }}</strong>
        </button>
      </th>
      <th>
        <button *ngIf="!isBs4"
                type="button"
                class="btn btn-default btn-secondary btn-sm pull-right float-right"
                (click)="datePicker.move(1)"
                tabindex="-1">›</button>
        <button *ngIf="isBs4"
                type="button"
                class="btn btn-default btn-secondary btn-sm pull-right float-right"
                (click)="datePicker.move(1)"
                tabindex="-1">&gt;
        </button>
      </th>
    </tr>
    <tr>
      <th *ngIf="datePicker.showWeeks"></th>
      <th *ngFor="let labelz of labels" class="text-center">
        <small aria-label="labelz.full"><b>{{ labelz.abbr }}</b></small>
      </th>
    </tr>
  </thead>
  <tbody>
    <ng-template ngFor [ngForOf]="rows" let-rowz="$implicit" let-index="index">
      <tr *ngIf="!(datePicker.onlyCurrentMonth && rowz[0].secondary && rowz[6].secondary)">
        <td *ngIf="datePicker.showWeeks" class="h6" class="text-center">
          <em>{{ weekNumbers[index] }}</em>
        </td>
        <td *ngFor="let dtz of rowz" class="text-center" role="gridcell" [id]="dtz.uid">
          <button type="button" style="min-width:100%;" class="btn btn-sm {{dtz.customClass}}"
                  *ngIf="!(datePicker.onlyCurrentMonth && dtz.secondary)"
                  [ngClass]="{'btn-secondary': isBs4 && !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected, disabled: dtz.disabled, active: !isBs4 && datePicker.isActive(dtz), 'btn-default': !isBs4}"
                  [disabled]="dtz.disabled"
                  (click)="datePicker.select(dtz.date)" tabindex="-1">
            <span [ngClass]="{'text-muted': dtz.secondary || dtz.current, 'text-info': !isBs4 && dtz.current}">{{ dtz.label }}</span>
          </button>
        </td>
      </tr>
    </ng-template>
  </tbody>
</table>
  `,
  styles: [
    `
    :host .btn-secondary {
      color: #292b2c;
      background-color: #fff;
      border-color: #ccc;
    }
    :host .btn-info .text-muted {
      color: #292b2c !important;
    }
  `
  ]
})
export class DayPickerComponent implements OnInit {
  labels: any[] = [];
  title: string;
  rows: any[] = [];
  weekNumbers: number[] = [];
  datePicker: DatePickerInnerComponent;

  constructor(datePicker: DatePickerInnerComponent) {
    this.datePicker = datePicker;
  }

  get isBs4(): boolean {
    return !isBs3();
  }

  /*protected getDaysInMonth(year:number, month:number) {
   return ((month === 1) && (year % 4 === 0) &&
   ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
   }*/
  ngOnInit(): void {
    const self = this;

    this.datePicker.stepDay = { months: 1 };

    this.datePicker.setRefreshViewHandler(function(): void {
      const year = this.activeDate.getFullYear();
      const month = this.activeDate.getMonth();
      const firstDayOfMonth = new Date(year, month, 1);
      const difference = this.startingDay - firstDayOfMonth.getDay();
      const numDisplayedFromPreviousMonth =
        difference > 0 ? 7 - difference : -difference;
      const firstDate = new Date(firstDayOfMonth.getTime());

      if (numDisplayedFromPreviousMonth > 0) {
        firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
      }

      // 42 is the number of days on a six-week calendar
      const _days: Date[] = self.getDates(firstDate, 42);
      const days: any[] = [];
      for (let i = 0; i < 42; i++) {
        const _dateObject = this.createDateObject(_days[i], this.formatDay);
        _dateObject.secondary = _days[i].getMonth() !== month;
        _dateObject.uid = this.uniqueId + '-' + i;
        days[i] = _dateObject;
      }

      self.labels = [];
      for (let j = 0; j < 7; j++) {
        self.labels[j] = {};
        self.labels[j].abbr = this.dateFilter(
          days[j].date,
          this.formatDayHeader
        );
        self.labels[j].full = this.dateFilter(days[j].date, 'EEEE');
      }

      self.title = this.dateFilter(this.activeDate, this.formatDayTitle);
      self.rows = this.split(days, 7);

      if (this.showWeeks) {
        self.weekNumbers = [];
        const thursdayIndex = (4 + 7 - this.startingDay) % 7;
        const numWeeks = self.rows.length;
        for (let curWeek = 0; curWeek < numWeeks; curWeek++) {
          self.weekNumbers.push(
            self.getISO8601WeekNumber(self.rows[curWeek][thursdayIndex].date)
          );
        }
      }
    }, 'day');

    this.datePicker.setCompareHandler(function(
      date1: Date,
      date2: Date
    ): number {
      const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
      return d1.getTime() - d2.getTime();
    }, 'day');

    this.datePicker.refreshView();
  }

  protected getDates(startDate: Date, n: number): Date[] {
    const dates: Date[] = new Array(n);
    let current = new Date(startDate.getTime());
    let i = 0;
    let date: Date;
    while (i < n) {
      date = new Date(current.getTime());
      date = this.datePicker.fixTimeZone(date);
      dates[i++] = date;
      current = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );
    }
    return dates;
  }

  protected getISO8601WeekNumber(date: Date): number {
    const checkDate = new Date(date.getTime());
    // Thursday
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
    const time = checkDate.getTime();
    // Compare with Jan 1
    checkDate.setMonth(0);
    checkDate.setDate(1);
    return (
      Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1
    );
  }

  // todo: key events implementation
}
