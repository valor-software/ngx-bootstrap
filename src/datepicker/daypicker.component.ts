import { Component, OnInit } from '@angular/core';

import { Ng2BootstrapConfig, Ng2BootstrapTheme } from '../ng2-bootstrap-config';
import { DatePickerInnerComponent } from './datepicker-inner.component';

// write an interface for template options
const TEMPLATE_OPTIONS:any = {
  [Ng2BootstrapTheme.BS4]: {
    ARROW_LEFT: '&lt;',
    ARROW_RIGHT: '&gt;'
  },
  [Ng2BootstrapTheme.BS3]: {
    ARROW_LEFT: `
    <i class="glyphicon glyphicon-chevron-left"></i>
    `,
    ARROW_RIGHT: `
    <i class="glyphicon glyphicon-chevron-right"></i>
    `
  }
};

@Component({
  selector: 'daypicker',
  template: `
<table *ngIf="datePicker.datepickerMode==='day'" role="grid" [attr.aria-labelledby]="datePicker.uniqueId+'-title'" aria-activedescendant="activeDateId">
  <thead>
    <tr>
      <th>
        <button type="button" 
                class="btn btn-default btn-secondary btn-sm pull-left" 
                (click)="datePicker.move(-1)" 
                tabindex="-1"
                [innerHTML]="CURRENT_THEME_TEMPLATE.ARROW_LEFT">
        </button>
      </th>
      <th [attr.colspan]="5 + (datePicker.showWeeks ? 1 : 0)">
        <button [id]="datePicker.uniqueId + '-title'"
                type="button" class="btn btn-default btn-secondary btn-sm"
                (click)="datePicker.toggleMode()"
                [disabled]="datePicker.datepickerMode === datePicker.maxMode"
                [ngClass]="{disabled: datePicker.datepickerMode === datePicker.maxMode}" tabindex="-1" style="width:100%;">
          <strong>{{title}}</strong>
        </button>
      </th>
      <th>
        <button type="button" 
                class="btn btn-default btn-secondary btn-sm pull-right" 
                (click)="datePicker.move(1)" 
                tabindex="-1"
                [innerHTML]="CURRENT_THEME_TEMPLATE.ARROW_RIGHT">
        </button>
      </th>
    </tr>
    <tr>
      <th *ngIf="datePicker.showWeeks"></th>
      <th *ngFor="let labelz of labels" [ngClass]="{'text-xs-center':isBS4, 'text-center': !isBS4}">
        <small aria-label="labelz.full"><b>{{labelz.abbr}}</b></small>
      </th>
    </tr>
  </thead>
  <tbody>
    <template ngFor [ngForOf]="rows" let-rowz="$implicit" let-index="index">
      <tr *ngIf="!(datePicker.onlyCurrentMonth && rowz[0].secondary && rowz[6].secondary)">
        <td *ngIf="datePicker.showWeeks" class="h6" [ngClass]="{'text-xs-center':isBS4, 'text-center': !isBS4}">
          <em>{{ weekNumbers[index] }}</em>
        </td>
        <td *ngFor="let dtz of rowz" [ngClass]="{'text-xs-center':isBS4, 'text-center': !isBS4}" role="gridcell" [id]="dtz.uid">
          <button type="button" style="min-width:100%;" class="btn btn-sm {{dtz.customClass}}"
                  *ngIf="!(datePicker.onlyCurrentMonth && dtz.secondary)"
                  [ngClass]="{'btn-secondary': isBS4 && !dtz.selected && !datePicker.isActive(dtz), 'btn-info': dtz.selected, disabled: dtz.disabled, active: !isBS4 && datePicker.isActive(dtz), 'btn-default': !isBS4}"
                  [disabled]="dtz.disabled"
                  (click)="datePicker.select(dtz.date)" tabindex="-1">
            <span [ngClass]="{'text-muted': dtz.secondary || dtz.current, 'text-info': !isBS4 && dtz.current}">{{dtz.label}}</span>
          </button>
        </td>
      </tr>
    </template>
  </tbody>
</table>
  `
})
export class DayPickerComponent implements OnInit {

  public labels:Array<any> = [];
  public title:string;
  public rows:Array<any> = [];
  public weekNumbers:Array<number> = [];
  public datePicker:DatePickerInnerComponent;
  public CURRENT_THEME_TEMPLATE:any = TEMPLATE_OPTIONS[Ng2BootstrapConfig.theme || Ng2BootstrapTheme.BS3];

  public constructor(datePicker:DatePickerInnerComponent) {
    this.datePicker = datePicker;
  }

  public get isBS4():boolean {
    return Ng2BootstrapConfig.theme === Ng2BootstrapTheme.BS4;
  }

  /*protected getDaysInMonth(year:number, month:number) {
   return ((month === 1) && (year % 4 === 0) &&
   ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
   }*/
  public ngOnInit():void {
    let self = this;

    this.datePicker.stepDay = {months: 1};

    this.datePicker.setRefreshViewHandler(function ():void {
      let year = this.activeDate.getFullYear();
      let month = this.activeDate.getMonth();
      let firstDayOfMonth = new Date(year, month, 1);
      let difference = this.startingDay - firstDayOfMonth.getDay();
      let numDisplayedFromPreviousMonth = (difference > 0)
        ? 7 - difference
        : -difference;
      let firstDate = new Date(firstDayOfMonth.getTime());

      if (numDisplayedFromPreviousMonth > 0) {
        firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
      }

      // 42 is the number of days on a six-week calendar
      let _days:Array<Date> = self.getDates(firstDate, 42);
      let days:Array<any> = [];
      for (let i = 0; i < 42; i++) {
        let _dateObject = this.createDateObject(_days[i], this.formatDay);
        _dateObject.secondary = _days[i].getMonth() !== month;
        _dateObject.uid = this.uniqueId + '-' + i;
        days[i] = _dateObject;
      }

      self.labels = [];
      for (let j = 0; j < 7; j++) {
        self.labels[j] = {};
        self.labels[j].abbr = this.dateFilter(days[j].date, this.formatDayHeader);
        self.labels[j].full = this.dateFilter(days[j].date, 'EEEE');
      }

      self.title = this.dateFilter(this.activeDate, this.formatDayTitle);
      self.rows = this.split(days, 7);

      if (this.showWeeks) {
        self.weekNumbers = [];
        let thursdayIndex = (4 + 7 - this.startingDay) % 7;
        let numWeeks = self.rows.length;
        for (let curWeek = 0; curWeek < numWeeks; curWeek++) {
          self.weekNumbers.push(self.getISO8601WeekNumber(self.rows[curWeek][thursdayIndex].date));
        }
      }
    }, 'day');

    this.datePicker.setCompareHandler(function (date1:Date, date2:Date):number {
      let d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      let d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
      return d1.getTime() - d2.getTime();
    }, 'day');

    this.datePicker.refreshView();
  }

  protected getDates(startDate:Date, n:number):Array<Date> {
    let dates:Array<Date> = new Array(n);
    let current = new Date(startDate.getTime());
    let i = 0;
    let date:Date;
    while (i < n) {
      date = new Date(current.getTime());
      date = this.datePicker.fixTimeZone(date);
      dates[i++] = date;
      current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
    }
    return dates;
  }

  protected getISO8601WeekNumber(date:Date):number {
    let checkDate = new Date(date.getTime());
    // Thursday
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
    let time = checkDate.getTime();
    // Compare with Jan 1
    checkDate.setMonth(0);
    checkDate.setDate(1);
    return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
  }

  // todo: key events implementation
}
