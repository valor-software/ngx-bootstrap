import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import {
  BsDatepickerViewMode, BsNavigationEvent, DatepickerRenderOptions,
  DayHoverEvent, DaysCalendarViewModel, DayViewModel, MonthHoverEvent,
  MonthsCalendarViewModel, YearHoverEvent,
  YearsCalendarViewModel
} from '../../models/index';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bs-datepicker-container',
  providers: [BsDatepickerStore],
  template: `
    <!-- days calendar view mode -->
    <div [ngSwitch]="viewMode | async">
      <bs-days-calendar-view
        *ngSwitchCase="'day'"
        [calendars]="daysCalendar | async"
        [options]="options | async"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
        (onHover)="dayHoverHandler($event)"
        (onSelect)="daySelectHandler($event)"
      ></bs-days-calendar-view>

      <bs-month-calendar-view
        *ngSwitchCase="'month'"
        [calendars]="monthsCalendar | async"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
        (onHover)="monthHoverHandler($event)"
        (onSelect)="monthSelectHandler($event)"
      ></bs-month-calendar-view>

      <bs-years-calendar-view
        *ngSwitchCase="'year'"
        [calendars]="yearsCalendar | async"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
        (onHover)="yearHoverHandler($event)"
      ></bs-years-calendar-view>
    </div>`,
  host: {
    '(click)': '_stopPropagation($event)',
    style: 'position: absolute; display: block;'
  }
})
export class BsDatepickerContainerComponent {
  @Input()
  set value(value: Date) {
    this._bsDatepickerStore.dispatch(this._actions.select(value));
  }

  @Output() valueChange = new EventEmitter<Date>();

  viewMode: Observable<BsDatepickerViewMode>;
  daysCalendar: Observable<DaysCalendarViewModel[]>;
  monthsCalendar: Observable<MonthsCalendarViewModel[]>;
  yearsCalendar: Observable<YearsCalendarViewModel[]>;
  options: Observable<DatepickerRenderOptions>;

  constructor(private _bsDatepickerStore: BsDatepickerStore,
              private _actions: BsDatepickerActions) {
    // data binding state <--> model
    // days calendar
    this.daysCalendar = this._bsDatepickerStore.select(state => state.flaggedMonths)
      .filter(months => !!months);

    // month calendar
    this.monthsCalendar = this._bsDatepickerStore.select(state => state.flaggedMonthsCalendar)
      .filter(months => !!months);

    // year calendar
    this.yearsCalendar = this._bsDatepickerStore.select(state => state.yearsCalendarFlagged)
      .filter(years => !!years);

    this.options = this._bsDatepickerStore.select(state => state.renderOptions)
      .filter(options => !!options);

    this.viewMode = this._bsDatepickerStore.select(state => state.viewMode);

    // set render options
    this._bsDatepickerStore.dispatch(this._actions.renderOptions({
      displayMonths: 1,
      showWeekNumbers: true
    }));

    // recalculate on view mode change
    this._bsDatepickerStore.select(state => state.viewMode)
      .subscribe(() => this._bsDatepickerStore.dispatch(this._actions.calculate()));

    // on selected date change
    this._bsDatepickerStore.select(state => state.selectedDate)
      .subscribe(date => this.valueChange.emit(date));

    // TODO: extract effects
    // calculate month model on view model change
    this._bsDatepickerStore
      .select(state => state.viewDate)
      .subscribe(() => this._bsDatepickerStore.dispatch(this._actions.calculate()));

    // format calendar values on month model change
    this._bsDatepickerStore
      .select(state => state.monthsModel)
      .filter(monthModel => !!monthModel)
      .subscribe(month =>
        this._bsDatepickerStore.dispatch(this._actions.format()));

    // flag day values
    this._bsDatepickerStore
      .select(state => state.formattedMonths)
      .filter(month => !!month)
      .subscribe(month =>
        this._bsDatepickerStore.dispatch(this._actions.flag()));

    // flag day values
    this._bsDatepickerStore.select(state => state.selectedDate)
      .filter(selectedDate => !!selectedDate)
      .subscribe(selectedDate =>
        this._bsDatepickerStore.dispatch(this._actions.flag()));

    // monthsCalendar
    this._bsDatepickerStore
      .select(state => state.monthsCalendar)
      .filter(state => !!state)
      .subscribe(() => this._bsDatepickerStore.dispatch(this._actions.flag()));

    // years calendar
    this._bsDatepickerStore
      .select(state => state.yearsCalendarModel)
      .filter(state => !!state)
      .subscribe(() => this._bsDatepickerStore.dispatch(this._actions.flag()));

    // on hover
    this._bsDatepickerStore.select(state => state.hoveredDate)
      .filter(hoveredDate => !!hoveredDate)
      .subscribe(hoveredDate =>
        this._bsDatepickerStore.dispatch(this._actions.flag()));
  }

  changeViewMode(event: BsDatepickerViewMode): void {
    this._bsDatepickerStore.dispatch(this._actions.changeViewMode(event));
  }

  navigateTo(event: BsNavigationEvent): void {
    this._bsDatepickerStore.dispatch(this._actions.navigateStep(event.step));
  }

  dayHoverHandler(event: DayHoverEvent): void {
    if (event.day.isOtherMonth) {
      return;
    }
    this._bsDatepickerStore.dispatch(this._actions.hoverDay(event));
    event.day.isHovered = event.isHovered;
  }

  daySelectHandler(day: DayViewModel): void {
    if (day.isOtherMonth) {
      return;
    }
    this._bsDatepickerStore.dispatch(this._actions.select(day.date));
  }

  monthHoverHandler(event: MonthHoverEvent): void {
    event.month.isHovered = event.isHovered;
  }

  monthSelectHandler(event: any): void {
    console.log(event);
  }

  yearHoverHandler(event: YearHoverEvent): void {
    event.year.isHovered = event.isHovered;
  }

  _stopPropagation(event: any): void {
    event.stopPropagation();
  }
}
