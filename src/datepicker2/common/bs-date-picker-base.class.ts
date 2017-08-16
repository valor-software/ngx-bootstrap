import { BsDatePickerState } from './bs-date-picker-state.provider';
import { BsDatePickerViewMode, BsDatePickerOptions, DatePickerViewModes } from './bs-date-picker-options.provider';
import * as moment from 'moment';

import { OnInit, OnDestroy } from '@angular/core';
import { DatePickerDate } from './date-picker-date.class';
import { Subscription } from 'rxjs/Subscription';

export type Granularity = 'day' | 'month' | 'year';

export abstract class DatePickerBase implements OnInit, OnDestroy {
  public options: BsDatePickerOptions;
  protected datePickerState: BsDatePickerState;

  protected calendar: DatePickerDate[][];

  protected subscriptions: Subscription[] = [];

  public constructor(datePickerState: BsDatePickerState, options: BsDatePickerOptions) {
    this.datePickerState = datePickerState;
    this.options = options;

    if (!datePickerState.viewDate) {
      datePickerState.viewDate = moment();
    }

    this.refresh(datePickerState.viewDate);

    this.subscriptions.push(options.onUpdate.subscribe(() => {
      this.refresh(datePickerState.viewDate);
    }));
    this.subscriptions.push(datePickerState.viewDateChange.subscribe((v: any) => {
      this.refresh(datePickerState.viewDate);
    }));
    this.subscriptions.push(datePickerState.activeDateChange.subscribe((v: any) => {
      this.markActive();
    }));
    this.subscriptions.push(datePickerState.selectedDateChange.subscribe((v: any) => {
      this.markSelected();
    }));
    this.subscriptions.push(datePickerState.selectedEndDateChange.subscribe((v: any) => {
      this.markSelected();
      this.markActive();
    }));
  }

  public ngOnInit(): void {
    if (this.options.date) {
      const selected = this.datePickerState.selectedDate || this.options.date.selected;
      const selectedEnd = this.datePickerState.selectedEndDate || this.options.date.selectedEnd;
      this.datePickerState.viewDate = this.datePickerState.viewDate || moment(this.options.date.initial);
      this.datePickerState.selectedDate = selected ? moment(selected) : void 0;
      this.datePickerState.selectedEndDate = selectedEnd ? moment(selectedEnd) : void 0;
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public abstract refresh(date: any): void;

  public viewPrev(unitOfTime: 'days' | 'months' | 'years', step: number = 1): void {
    this.datePickerState.viewDate = this.datePickerState.viewDate.clone().subtract(step, unitOfTime);
  }

  public viewNext(unitOfTime: 'days' | 'months' | 'years', step: number = 1): void {
    this.datePickerState.viewDate = this.datePickerState.viewDate.clone().add(step, unitOfTime);
  }

  /**
   * Selects new view mode
   * do nothing if mode <> min/max modes
   */
  public viewMode(mode: BsDatePickerViewMode): void {
    if (DatePickerViewModes[mode] >= DatePickerViewModes[this.options.ui.minMode] &&
      DatePickerViewModes[mode] <= DatePickerViewModes[this.options.ui.maxMode]) {
      this.options.viewMode = mode;
    }
  }

  public viewDate(date: moment.Moment, _opts: {degrade: boolean}): void {
    const opts = Object.assign({}, {degrade: false}, _opts);
    this.datePickerState.viewDate = date;

    // fixme: triple if, oh really?
    if (this.options.viewMode && opts.degrade) {
      if (this.options.viewMode === 'years') {
        if (DatePickerViewModes.months >= DatePickerViewModes[this.options.ui.minMode]) {
          this.options.viewMode = 'months';
        } else {
          this.selectDate(date);
        }
      } else if (this.options.viewMode === 'months') {
        if (DatePickerViewModes.days >= DatePickerViewModes[this.options.ui.minMode]) {
          this.options.viewMode = 'days';
        } else {
          this.selectDate(date);
        }
      }
    }
  }

  public activeDate(date: moment.Moment): void {
    if (date && this.isDisabled(date)) {
      return;
    }

    // todo: add range check

    this.datePickerState.activeDate = date;
  }

  public selectDate(date: moment.Moment): void {
    if (this.isDisabled(date)) {
      return;
    }

    if (this.options.isDatePicker) {
      // select date
      this.datePickerState.selectedDate = date;
      this.datePickerState.selectedEndDate = void 0;
      return;
    }

    if (this.options.isDateRangePicker) {
      // if no selected then set start date
      if (!this.datePickerState.selectedDate) {
        this.datePickerState.selectedDate = date;
        return;
      }

      // if end date lesser then the start date
      if (moment(date).isBefore(this.datePickerState.selectedDate, this.viewGranularity)) {
        this.datePickerState.selectedDate = date;
        this.datePickerState.selectedEndDate = void 0;
        return;
      }

      // allow to select one date at range picker
      if (moment(date).isSame(this.datePickerState.selectedDate, this.viewGranularity)) {
        this.datePickerState.selectedEndDate = date;
        return;
      }

      // select new range start
      if (this.datePickerState.selectedEndDate) {
        this.datePickerState.selectedDate = date;
        this.datePickerState.selectedEndDate = void 0;
        return;
      }

      // don't allow to select range with disabled dates in the middle
      if (this.isDisabledDateInRange(date)) {
        return;
      }

      // if start date is selected than select end date
      if (this.isSame(this.datePickerState.selectedDate, date)) {
        this.datePickerState.selectedDate = date;
        this.datePickerState.selectedEndDate = void 0;
        return;
      }

      this.datePickerState.selectedEndDate = date;
    }
  }

  public resetSelection(): void {
    this.datePickerState.selectedDate = void 0;
    this.datePickerState.selectedEndDate = void 0;
  }

  public isSelected(date: moment.Moment): boolean {
    if (!date) {
      return false;
    }

    if (this.options.isDatePicker) {
      return this.isSame(this.datePickerState.selectedDate, date);
    }

    return this.isSame(this.datePickerState.selectedDate, date) ||
      this.isSame(this.datePickerState.selectedEndDate, date);
  }

  public isActive(currDate: moment.Moment): boolean {
    if (this.options.isDatePicker) {
      return false;
    }

    const selectedDate = this.datePickerState.selectedDate;
    const selectedEndDate = this.datePickerState.selectedEndDate;
    const activeDate = this.datePickerState.activeDate;

    if (!selectedDate || !currDate) {
      return false;
    }

    if (selectedDate && !activeDate && !selectedEndDate) {
      return false;
    }

    if (selectedEndDate) {
      // fixme: makes sense only for day selection
      if (this.isDisabledDateInRange(selectedEndDate)) {
        return false;
      }
      return moment(currDate).isAfter(selectedDate, this.viewGranularity) &&
        moment(currDate).isBefore(selectedEndDate, this.viewGranularity);
    }

    if (this.isDisabledDateInRange(activeDate)) {
      return false;
    }
    return moment(currDate).isAfter(selectedDate, this.viewGranularity) &&
      moment(currDate).isBefore(activeDate, this.viewGranularity);
  }

  public isDisabled(date: moment.Moment, granularity: Granularity = 'day'): boolean {
    if (!date) {
      return true;
    }

    const minDate = this.options.date && this.options.date.min;
    const maxDate = this.options.date && this.options.date.max;

    if (minDate && moment(date).isSameOrBefore(minDate, granularity)) {
      return true;
    }

    if (maxDate && moment(date).isSameOrAfter(maxDate, granularity)) {
      return true;
    }

    const customDates = this.options.customDates;
    if (customDates) {
      for (let i = 0; i < customDates.length; i++) {
        if (customDates[i].isDisabled && this.isSame(customDates[i].date, date)) {
          return true;
        }
      }
    }

    // todo: check dates options
    return false;
  }

  public isSelectionStart(date: moment.Moment): boolean {
    if (!this.options.isDateRangePicker) {
      return false;
    }
    return this.isSame(date, this.datePickerState.selectedDate);
  }

  public isSelectionEnd(date: moment.Moment): boolean {
    if (!this.options.isDateRangePicker) {
      return false;
    }
    return this.isSame(date, this.datePickerState.selectedEndDate);
  }

  public isOtherMonth(date: moment.Moment, viewDate: moment.Moment): boolean {
    return !moment(date).isSame(viewDate, 'month');
  }

  public isHighlighted(date: moment.Moment): boolean {
    if (this.isDisabledDateInRange(date)) {
      return false;
    }

    if (!this.datePickerState.activeDate || !date) {
      return false;
    }

    return moment(date).isSame(this.datePickerState.activeDate, this.viewGranularity);
  }

  public isDisabledDateInRange(date: moment.Moment): boolean {
    if (!this.options.isDateRangePicker) {
      return false;
    }

    const customDates = this.options.customDates;
    if (customDates) {
      for (let i = 0; i < customDates.length; i++) {
        if (customDates[i].isDisabled &&
          moment(customDates[i].date).isSameOrAfter(this.datePickerState.selectedDate, this.viewGranularity) &&
          moment(customDates[i].date).isSameOrBefore(date, this.viewGranularity)) {
          return true;
        }
      }
    }

    return false;
  }

  public markActive(): void {
    if (!this.calendar || !this.calendar.length) {
      return;
    }
    // mark proper dates as active
    for (let i = 0; i < this.calendar.length; i++) {
      for (let j = 0; j < this.calendar[i].length; j++) {
        if (this.calendar[i][j].isSelected) {
          continue;
        }
        if (this.calendar[i][j].isDisabled) {
          continue;
        }
        this.calendar[i][j].isActive = this.isActive(this.calendar[i][j].date);
        this.calendar[i][j].isHighlighted = this.isHighlighted(this.calendar[i][j].date);
      }
    }
  }

  public markSelected(): void {
    if (!this.calendar || !this.calendar.length) {
      return;
    }
    // mark proper dates as selected
    for (let i = 0; i < this.calendar.length; i++) {
      for (let j = 0; j < this.calendar[i].length; j++) {
        const isSelected = this.isSelected(this.calendar[i][j].date);
        this.calendar[i][j].isSelected = isSelected;
        this.calendar[i][j].isSelectionStart = this.isSelectionStart(this.calendar[i][j].date);
        this.calendar[i][j].isSelectionEnd = this.isSelectionEnd(this.calendar[i][j].date);
        if (isSelected) {
          this.calendar[i][j].isActive = false;
          this.calendar[i][j].isHighlighted = false;
        }
      }
    }
  }

  public getDaysCalendarMatrix(viewDate: moment.Moment): any {
    //
    // Build the matrix of dates that will populate the calendar
    //
    // current date
    const month = viewDate.month();
    const year = viewDate.year();
    // const date = viewDate.date();
    const hour = viewDate.hour();
    const minute = viewDate.minute();
    const second = viewDate.second();
    // month range
    const firstDay = moment([year, month, 1]);
    // prev
    const lastMonth = moment(firstDay).subtract(1, 'month').month();
    const lastYear = moment(firstDay).subtract(1, 'month').year();

    // initialize a 6 rows x 7 columns array for the calendar
    const calendarW = this.options.ui.dayColums;
    const calendarH = this.options.ui.dayRows;
    const calendar = new Array(calendarW);

    for (let j = 0; j < calendarW; j++) {
      calendar[j] = new Array(calendarH);
    }

    const startDay = this.getStartingDay(viewDate).date();
    // fixme: take in account time picker
    let curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);
    // where the f*** 42 came from
    for (let [i, col, row] = [0, 0, 0]; i < calendarH * calendarW; i++, col++, curDate = moment(curDate)
      .add(24, 'hour')) {
      if (i > 0 && col % 7 === 0) {
        col = 0;
        row++;
      }

      calendar[row][col] = {
        date: curDate.clone().hour(hour).minute(minute).second(second),
        label: curDate.format(this.options.format.day),
        isActive: this.isActive(curDate),
        isSelected: this.isSelected(curDate),
        isDisabled: this.isDisabled(curDate),
        isSelectionStart: this.isSelectionStart(curDate),
        isSelectionEnd: this.isSelectionEnd(curDate),
        isOtherMonth: this.isOtherMonth(curDate, viewDate),
        isHighlighted: this.isHighlighted(curDate)
      };
      curDate.hour(12);
    }

    return calendar;
  }

  public getMonthsCalendarMatrix(viewDate: moment.Moment/*, options:any*/): any {
    const w = 3;
    const h = 4;
    let months = new Array(h);
    for (let row = 0; row < h; row++) {
      months[row] = new Array(w);
      for (let coll = 0; coll < w; coll++) {
        const monthNum = row * w + coll;
        const date = moment([viewDate.year(), monthNum, 1]);
        months[row][coll] = {
          date: date,
          label: date.format(this.options.format.month),
          isActive: this.isActive(date),
          isSelected: this.isSelected(date),
          isDisabled: this.isDisabled(date),
          isSelectionStart: this.isSelectionStart(date),
          isSelectionEnd: this.isSelectionEnd(date),
          isHighlighted: this.isHighlighted(date)
        };
      }
    }
    return months;
  }

  public getYearsCalendarMatrix(viewDate: moment.Moment/*, options:any*/): any {
    let year = this.getStartingYear(viewDate.year());
    const cols = this.options.ui.yearColumns;
    const rows = this.options.ui.yearRows;
    let yearsMatrix = new Array(rows);
    for (let row = 0; row < rows; row++) {
      yearsMatrix[row] = new Array(cols);
      for (let coll = 0; coll < cols; coll++, year++) {
        const date = moment([year, viewDate.month()]);
        yearsMatrix[row][coll] = {
          date: date,
          label: date.format(this.options.format.year),
          isActive: this.isActive(date),
          isSelected: this.isSelected(date),
          isDisabled: this.isDisabled(date),
          isSelectionStart: this.isSelectionStart(date),
          isSelectionEnd: this.isSelectionEnd(date),
          isHighlighted: this.isHighlighted(date)
        };
      }
    }
    return yearsMatrix;
  }

  public getWeeksNumbers(calendar: DatePickerDate[][]): number[] {
    const weekFormat = this.options.ui.showISOWeekNumbers ? 'WW' : 'ww';
    return calendar.map(row => parseInt(moment(row[0].date).format(weekFormat), 10));
  }

  public getLocale(): any {
    const localeData = moment.localeData();
    return {
      direction: 'ltr',
      format: localeData.longDateFormat('L'),
      separator: ' - ',
      applyLabel: 'Apply',
      cancelLabel: 'Cancel',
      weekLabel: 'W',
      customRangeLabel: 'Custom Range',
      weekdays: moment.weekdays(true),
      weekdaysShort: moment.weekdaysMin(true),
      monthNames: moment.monthsShort(),
      firstDay: (localeData as any).firstDayOfWeek()
    };
  }

  public getStartingDay(viewDate: moment.Moment): moment.Moment {
    const locale = this.getLocale();
    const month = viewDate.month();
    const year = viewDate.year();
    const firstDay = moment([year, month, 1]);
    // prev
    const lastMonth = moment(firstDay).subtract(1, 'month').month();
    const lastYear = moment(firstDay).subtract(1, 'month').year();

    const daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
    const dayOfWeek = firstDay.day();
    // populate the calendar with date objects
    let startDay = daysInLastMonth - dayOfWeek + locale.firstDay + 1;
    if (startDay > daysInLastMonth) {
      startDay -= 7;
    }

    if (dayOfWeek === locale.firstDay) {
      startDay = daysInLastMonth - 6;
    }

    return moment([year, lastMonth, startDay]);
  }

  public getStartingYear(year: number): number {
    const yearsStep = this.options.ui.yearColumns * this.options.ui.yearRows;
    // return ((year - 1) / this.yearsStep) * this.yearsStep + 1;
    return year - year % yearsStep;
  }

  public isSame(date1: moment.Moment, date2: moment.Moment): boolean {
    if (!date1 || !date2) {
      return false;
    }

    return moment(date1).isSame(date2, this.viewGranularity);
  }

  public get viewGranularity(): moment.unitOfTime.Base {
    switch (this.options.viewMode) {
      case 'days':
        return 'day';
      case 'months':
        return 'month';
      case 'years':
        return 'years';
      default:
        throw new Error('Unexpected view mode');
    }
  }
}
