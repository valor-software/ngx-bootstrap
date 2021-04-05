import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { DateFormatter } from './date-formatter';

type CompareDatesFn = (date1: Date, date2: Date) => number;

@Component({
  selector: 'datepicker-inner',
  template: `
    <!--&lt;!&ndash;ng-keydown="keydown($event)"&ndash;&gt;-->
    <div *ngIf='datepickerMode' class='well well-sm bg-faded p-a card' role='application'>
      <ng-content></ng-content>
    </div>
  `
})
export class DatePickerInnerComponent implements OnInit, OnChanges {
  @Input() locale?: string;
  @Input() datepickerMode?: string;
  @Input() startingDay?: number;
  @Input() yearRange?: number;

  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() minMode?: string;
  @Input() maxMode?: string;
  @Input() showWeeks?: boolean;
  @Input() formatDay?: string;
  @Input() formatMonth?: string;
  @Input() formatYear?: string;
  @Input() formatDayHeader?: string;
  @Input() formatDayTitle?: string;
  @Input() formatMonthTitle?: string;
  @Input() onlyCurrentMonth?: boolean;
  @Input() shortcutPropagation?: boolean;
  @Input() customClass?: { date: Date; mode: string; clazz: string }[];
  @Input() monthColLimit = 0;
  @Input() yearColLimit = 0;
  @Input() dateDisabled?: { date: Date; mode: string }[];
  @Input() dayDisabled?: number[];
  @Input() initDate?: Date;

  @Output() selectionDone: EventEmitter<Date> = new EventEmitter<Date>(undefined);
  @Output() update: EventEmitter<Date> = new EventEmitter<Date>(false);
  @Output() activeDateChange: EventEmitter<Date> = new EventEmitter<Date>(undefined);

  stepDay = {};
  stepMonth = {};
  stepYear = {};

  uniqueId?: string;

  protected modes: string[] = ['day', 'month', 'year'];
  protected dateFormatter: DateFormatter = new DateFormatter();
  protected selectedDate?: Date;
  protected activeDateId?: string;
  protected refreshViewHandlerDay?: () => void;
  protected compareHandlerDay?: CompareDatesFn;
  protected refreshViewHandlerMonth?: () => void;
  protected compareHandlerMonth?: CompareDatesFn;
  protected refreshViewHandlerYear?: () => void;
  protected compareHandlerYear?: CompareDatesFn;

  protected _activeDate?: Date;

  @Input()
  get activeDate(): Date|undefined {
    return this._activeDate;
  }

  set activeDate(value: Date|undefined) {
    this._activeDate = value;
  }

  // todo: add formatter value to Date object
  ngOnInit(): void {
    // todo: use date for unique value
    this.uniqueId = `datepicker--${Math.floor(Math.random() * 10000)}`;

    if (this.initDate) {
      this.activeDate = this.initDate;
      this.selectedDate = new Date(this.activeDate.valueOf());
      this.update.emit(this.activeDate);
    } else if (this.activeDate === undefined) {
      this.activeDate = new Date();
    }
  }

  // this.refreshView should be called here to reflect the changes on the fly
  ngOnChanges(changes: SimpleChanges): void {
    this.refreshView();
    this.checkIfActiveDateGotUpdated(changes.activeDate);
  }

  // Check if activeDate has been update and then emit the activeDateChange with the new date
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkIfActiveDateGotUpdated(activeDate: any): void {
    if (activeDate && !activeDate.firstChange) {
      const previousValue = activeDate.previousValue;
      if (
        previousValue &&
        previousValue instanceof Date &&
        previousValue.getTime() !== activeDate.currentValue.getTime()
      ) {
        this.activeDateChange.emit(this.activeDate);
      }
    }
  }

  setCompareHandler(handler: CompareDatesFn, type: string): void {
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

  compare(date1?: Date, date2?: Date): number | undefined {
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

  setRefreshViewHandler(handler: () => void, type: string): void {
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

  refreshView(): void {
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

  dateFilter(date: Date, format: string): string {
    return this.dateFormatter.format(date, format, this.locale);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isActive(dateObject: any): boolean {
    if (this.compare(dateObject.date, this.activeDate) === 0) {
      this.activeDateId = dateObject.uid;

      return true;
    }

    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createDateObject(date: Date, format: string): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dateObject: any = {};
    dateObject.date = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    dateObject.date = this.fixTimeZone(dateObject.date);
    dateObject.label = this.dateFilter(date, format);
    dateObject.selected = this.compare(date, this.selectedDate) === 0;
    dateObject.disabled = this.isDisabled(date);
    dateObject.current = this.compare(date, new Date()) === 0;
    dateObject.customClass = this.getCustomClassForDate(dateObject.date);

    return dateObject;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  split(arr: any[], size: number): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const arrays: any[] = [];
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
  fixTimeZone(date: Date): Date {
    const hours = date.getHours();

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours === 23 ? hours + 2 : 0
    );
  }

  select(date: Date, isManual = true): void {
    if (this.datepickerMode === this.minMode) {
      if (!this.activeDate) {
        this.activeDate = new Date(0, 0, 0, 0, 0, 0, 0);
      }

      this.activeDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      this.activeDate = this.fixTimeZone(this.activeDate);
      if (isManual) {
        this.selectionDone.emit(this.activeDate);
      }
    } else {
      this.activeDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      this.activeDate = this.fixTimeZone(this.activeDate);
      if (isManual && this.datepickerMode) {
        this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) - 1];
      }
    }

    this.selectedDate = new Date(this.activeDate.valueOf());
    this.update.emit(this.activeDate);
    this.refreshView();
  }

  move(direction: number): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    if (expectedStep && this.activeDate) {
      const year =
        this.activeDate.getFullYear() + direction * (expectedStep.years || 0);
      const month =
        this.activeDate.getMonth() + direction * (expectedStep.months || 0);
      this.activeDate = new Date(year, month, 1);

      this.refreshView();
      this.activeDateChange.emit(this.activeDate);
    }
  }

  toggleMode(_direction: number): void {
    const direction = _direction || 1;

    if (
      (this.datepickerMode === this.maxMode && direction === 1) ||
      (this.datepickerMode === this.minMode && direction === -1)
    ) {
      return;
    }

    if (this.datepickerMode) {
      this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) + direction];
    }

    this.refreshView();
  }

  protected getCustomClassForDate(date: Date): string {
    if (!this.customClass) {
      return '';
    }
    // todo: build a hash of custom classes, it will work faster
    const customClassObject: ({
      date: Date;
      mode: string;
      clazz: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } | undefined) = this.customClass.find((customClass: any) => {
      return (
        customClass.date.valueOf() === date.valueOf() &&
        customClass.mode === this.datepickerMode
      );
    }, this);

    return customClassObject === undefined ? '' : customClassObject.clazz;
  }

  protected compareDateDisabled(
    date1Disabled: { date: Date; mode: string },
    date2: Date
  ): number | undefined {
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
    let isDateDisabled = false;
    if (this.dateDisabled) {
      this.dateDisabled.forEach(
        (disabledDate: { date: Date; mode: string }) => {
          if (this.compareDateDisabled(disabledDate, date) === 0) {
            isDateDisabled = true;
          }
        }
      );
    }

    if (this.dayDisabled) {
      isDateDisabled =
        isDateDisabled ||
        this.dayDisabled.indexOf(date.getDay()) > -1;
    }

    if (isDateDisabled) {
      return isDateDisabled;
    }

    const minDate = Number(this.minDate && this.compare(date, this.minDate));
    if (!isNaN(minDate)) {
      return minDate < 0;
    }

    const maxDate = Number(this.maxDate && this.compare(date, this.maxDate));
    if (!isNaN(maxDate)) {
      return maxDate > 0;
    }

    return false;
  }
}
