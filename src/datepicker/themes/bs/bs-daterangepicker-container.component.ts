import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import {
  BsNavigationEvent, DatepickerRenderOptions, DayHoverEvent, DayViewModel,
  MonthViewModel
} from '../../models/index';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'bs-daterangepicker-container',
  providers: [BsDatepickerStore],
  template: `
    <bs-datepicker-view
      *ngIf="months && options"
      [months]="months"
      [options]="options"
      (onNavigate)="navigateTo($event)"
      (onHover)="hoverHandler($event)"
      (onSelect)="selectHandler($event)"
    ></bs-datepicker-view>
  `,
  host: {
    '(click)': '_stopPropagation($event)',
    style: 'position: absolute; display: block;'
  }
})
export class BsDaterangepickerContainerComponent implements OnInit {
  @Input()
  set value(value: Date[]) {
    this._bsDatepickerStore.dispatch(this._actions.selectRange(value || []));
  }

  @Output() valueChange = new EventEmitter<Date[]>();

  months: MonthViewModel[];
  options: DatepickerRenderOptions;
  _rangeStack: Date[] = [];

  constructor(private _bsDatepickerStore: BsDatepickerStore,
              private _actions: BsDatepickerActions) {
    // data binding state <--> model
    this._bsDatepickerStore.select(state => state.flaggedMonths)
      .filter(months => !!months)
      .subscribe(months => this.months = months);

    this._bsDatepickerStore.select(state => state.renderOptions)
      .filter(options => !!options)
      .subscribe(options => this.options = options);

    // set render options
    this._bsDatepickerStore.dispatch(this._actions.renderOptions({
      displayMonths: 2,
      showWeekNumbers: true
    }));

    // on selected date change
    this._bsDatepickerStore.select(state => state.selectedRange)
      .subscribe(date => this.valueChange.emit(date));

    // TODO: extract effects
    // calculate month model on view model change
    this._bsDatepickerStore
      .select(state => state.viewDate)
      .subscribe(viewDate =>
        this._bsDatepickerStore.dispatch(this._actions.calculate(viewDate)));

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
    this._bsDatepickerStore.select(state => state.selectedRange)
      .filter(selectedRange => !!selectedRange)
      .subscribe(selectedRange =>
        this._bsDatepickerStore.dispatch(this._actions.flag()));

    // on hover
    this._bsDatepickerStore.select(state => state.hoveredDate)
      .filter(hoveredDate => !!hoveredDate)
      .subscribe(hoveredDate =>
        this._bsDatepickerStore.dispatch(this._actions.flag()));
  }

  ngOnInit() {
    // this._bsDatepickerStore.dispatch(this._actions.init());
  }

  navigateTo(event: BsNavigationEvent): void {
    this._bsDatepickerStore.dispatch(this._actions.navigateStep(event.step));
  }

  hoverHandler(event: DayHoverEvent): void {
    if (event.day.isOtherMonth) {
      return;
    }
    this._bsDatepickerStore.dispatch(this._actions.hover(event));
    event.day.isHovered = event.isHovered;
  }

  selectHandler(day: DayViewModel): void {
    if (day.isOtherMonth) {
      return;
    }

    if (this._rangeStack.length === 1) {
      if (day.date >= this._rangeStack[0]) {
        this._rangeStack = [this._rangeStack[0], day.date];
      } else {
        this._rangeStack = [day.date];
      }
    }

    if (this._rangeStack.length === 0) {
      this._rangeStack = [day.date];
    }

    this._bsDatepickerStore.dispatch(this._actions.selectRange(this._rangeStack));

    if (this._rangeStack.length === 2) {
      this._rangeStack = [];
    }
  }

  _stopPropagation(event: any): void {
    event.stopPropagation();
  }
}
