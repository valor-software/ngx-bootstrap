/* tslint:disable:max-file-line-count */
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { DateFormatter } from './date-formatter';

// const MIN_DATE:Date = void 0;
// const MAX_DATE:Date = void 0;
// const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/*
 const KEYS = {
 13: 'enter',
 32: 'space',
 33: 'pageup',
 34: 'pagedown',
 35: 'end',
 36: 'home',
 37: 'left',
 38: 'up',
 39: 'right',
 40: 'down'
 };
 */

@Component({
  selector: 'datepicker-inner',
  template: `
    <div *ngIf="datepickerMode" class="well well-sm bg-faded p-a card" role="application" ><!--&lt;!&ndash;ng-keydown="keydown($event)"&ndash;&gt;-->
      <ng-content></ng-content>
    </div>
  `
})
export class DatePickerInnerComponent implements OnInit, OnChanges {
  @Input() public datepickerMode: string;
  @Input() public startingDay: number;
  @Input() public yearRange: number;

  @Input() public minDate: Date;
  @Input() public maxDate: Date;
  @Input() public minMode: string;
  @Input() public maxMode: string;
  @Input() public showWeeks: boolean;
  @Input() public formatDay: string;
  @Input() public formatMonth: string;
  @Input() public formatYear: string;
  @Input() public formatDayHeader: string;
  @Input() public formatDayTitle: string;
  @Input() public formatMonthTitle: string;
  @Input() public onlyCurrentMonth: boolean;
  @Input() public shortcutPropagation: boolean;
  @Input() public customClass: { date: Date, mode: string, clazz: string }[];
  @Input() public monthColLimit: number;
  @Input() public yearColLimit: number;
  @Input() public dateDisabled: { date: Date, mode: string }[];
  @Input() public initDate: Date;

  @Output() public selectionDone: EventEmitter<Date> = new EventEmitter<Date>(undefined);

  @Output() public update: EventEmitter<Date> = new EventEmitter<Date>(false);

  @Output() public activeDateChange: EventEmitter<Date> = new EventEmitter<Date>(undefined);

  public stepDay: any = {};
  public stepMonth: any = {};
  public stepYear: any = {};

  protected modes: string[] = ['day', 'month', 'year'];
  protected dateFormatter: DateFormatter = new DateFormatter();
  protected uniqueId: string;
  protected _activeDate: Date;
  protected selectedDate: Date;
  protected activeDateId: string;

  protected refreshViewHandlerDay: Function;
  protected compareHandlerDay: Function;
  protected refreshViewHandlerMonth: Function;
  protected compareHandlerMonth: Function;
  protected refreshViewHandlerYear: Function;
  protected compareHandlerYear: Function;

  @Input()
  public get activeDate(): Date {
    return this._activeDate;
  }

  public set activeDate(value: Date) {
    this._activeDate = value;
  }

  // todo: add formatter value to Date object
  public ngOnInit(): void {
    // todo: use date for unique value
    this.uniqueId = 'datepicker-' + '-' + Math.floor(Math.random() * 10000);

    if (this.initDate) {
      this.activeDate = this.initDate;
      this.selectedDate = new Date(this.activeDate.valueOf() as number);
      this.update.emit(this.activeDate);
    } else if (this.activeDate === undefined) {
      this.activeDate = new Date();
    }
  }

  // this.refreshView should be called here to reflect the changes on the fly
  // tslint:disable-next-line:no-unused-variable
  public ngOnChanges(changes: SimpleChanges): void {
    this.refreshView();
  }

  public setCompareHandler(handler: Function, type: string): void {
    if (type === 'day') {
      this.compareHandlerDay = handler;
    }

    if (type === 'month') {
      this.compareHandlerMonth = handler;
    }

    if (type === 'year') {
      this.compareHandlerYear = handler;
    }
  }

  public compare(date1: Date, date2: Date): number | undefined {
    if (date1 === undefined || date2 === undefined) {
      return undefined;
    }

    if (this.datepickerMode === 'day' && this.compareHandlerDay) {
      return this.compareHandlerDay(date1, date2);
    }

    if (this.datepickerMode === 'month' && this.compareHandlerMonth) {
      return this.compareHandlerMonth(date1, date2);
    }

    if (this.datepickerMode === 'year' && this.compareHandlerYear) {
      return this.compareHandlerYear(date1, date2);
    }

    return void 0;
  }

  public setRefreshViewHandler(handler: Function, type: string): void {
    if (type === 'day') {
      this.refreshViewHandlerDay = handler;
    }

    if (type === 'month') {
      this.refreshViewHandlerMonth = handler;
    }

    if (type === 'year') {
      this.refreshViewHandlerYear = handler;
    }
  }

  public refreshView(): void {
    if (this.datepickerMode === 'day' && this.refreshViewHandlerDay) {
      this.refreshViewHandlerDay();
    }

    if (this.datepickerMode === 'month' && this.refreshViewHandlerMonth) {
      this.refreshViewHandlerMonth();
    }

    if (this.datepickerMode === 'year' && this.refreshViewHandlerYear) {
      this.refreshViewHandlerYear();
    }
  }

  public dateFilter(date: Date, format: string): string {
    return this.dateFormatter.format(date, format);
  }

  public isActive(dateObject: any): boolean {
    if (this.compare(dateObject.date, this.activeDate) === 0) {
      this.activeDateId = dateObject.uid;
      return true;
    }

    return false;
  }

  public createDateObject(date: Date, format: string): any {
    let dateObject: any = {};
    dateObject.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    dateObject.label = this.dateFilter(date, format);
    dateObject.selected = this.compare(date, this.selectedDate) === 0;
    dateObject.disabled = this.isDisabled(date);
    dateObject.current = this.compare(date, new Date()) === 0;
    dateObject.customClass = this.getCustomClassForDate(dateObject.date);
    return dateObject;
  }

  public split(arr: any[], size: number): any[] {
    let arrays: any[] = [];
    while (arr.length > 0) {
      arrays.push(arr.splice(0, size));
    }
    return arrays;
  }

  // Fix a hard-reproducible bug with timezones
  // The bug depends on OS, browser, current timezone and current date
  // i.e.
  // var date = new Date(2014, 0, 1);
  // console.log(date.getFullYear(), date.getMonth(), date.getDate(),
  // date.getHours()); can result in "2013 11 31 23" because of the bug.
  public fixTimeZone(date: Date): Date {
    let hours = date.getHours();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours === 23 ? hours + 2 : 0);
  }

  public select(date: Date, isManual: boolean = true): void {
    if (this.datepickerMode === this.minMode) {
      if (!this.activeDate) {
        this.activeDate = new Date(0, 0, 0, 0, 0, 0, 0);
      }

      this.activeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      if (isManual) {
        this.selectionDone.emit(this.activeDate);
      }
    } else {
      this.activeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) - 1];
    }

    this.selectedDate = new Date(this.activeDate.valueOf() as number);
    this.update.emit(this.activeDate);
    this.refreshView();
  }

  public move(direction: number): void {
    let expectedStep: any;
    if (this.datepickerMode === 'day') {
      expectedStep = this.stepDay;
    }

    if (this.datepickerMode === 'month') {
      expectedStep = this.stepMonth;
    }

    if (this.datepickerMode === 'year') {
      expectedStep = this.stepYear;
    }

    if (expectedStep) {
      let year = this.activeDate.getFullYear() + direction * (expectedStep.years || 0);
      let month = this.activeDate.getMonth() + direction * (expectedStep.months || 0);
      this.activeDate = new Date(year, month, 1);

      this.refreshView();
      this.activeDateChange.emit(this.activeDate);
    }
  }

  public toggleMode(direction: number): void {
    direction = direction || 1;

    if ((this.datepickerMode === this.maxMode && direction === 1) ||
      (this.datepickerMode === this.minMode && direction === -1)) {
      return;
    }

    this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) + direction];
    this.refreshView();
  }

  protected getCustomClassForDate(date: Date): string {
    if (!this.customClass) {
      return '';
    }
    // todo: build a hash of custom classes, it will work faster
    const customClassObject: { date: Date, mode: string, clazz: string } = this.customClass
      .find((customClass: any) => {
        return customClass.date.valueOf() === date.valueOf() &&
          customClass.mode === this.datepickerMode;
      }, this);
    return customClassObject === undefined ? '' : customClassObject.clazz;
  }

  protected compareDateDisabled(date1Disabled: { date: Date, mode: string }, date2: Date): number {
    if (date1Disabled === undefined || date2 === undefined) {
      return undefined;
    }

    if (date1Disabled.mode === 'day' && this.compareHandlerDay) {
      return this.compareHandlerDay(date1Disabled.date, date2);
    }

    if (date1Disabled.mode === 'month' && this.compareHandlerMonth) {
      return this.compareHandlerMonth(date1Disabled.date, date2);
    }

    if (date1Disabled.mode === 'year' && this.compareHandlerYear) {
      return this.compareHandlerYear(date1Disabled.date, date2);
    }

    return undefined;
  }

  protected isDisabled(date: Date): boolean {
    let isDateDisabled: boolean = false;
    if (this.dateDisabled) {
      this.dateDisabled.forEach((disabledDate: { date: Date, mode: string }) => {
        if (this.compareDateDisabled(disabledDate, date) === 0) {
          isDateDisabled = true;
        }
      });
    }

    return (isDateDisabled || (this.minDate && this.compare(date, this.minDate) < 0) ||
      (this.maxDate && this.compare(date, this.maxDate) > 0));
  }
}
