import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BsDatepickerAbstractComponent } from '../../base/bs-datepicker-container';

import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { DayViewModel, CalendarCellViewModel } from '../../models/index';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'bs-datepicker-container',
  providers: [BsDatepickerStore, BsDatepickerEffects],
  templateUrl: './bs-datepicker-view.html',
  host: {
    '(click)': '_stopPropagation($event)',
    style: 'position: absolute; display: block;'
  }
})
export class BsDatepickerContainerComponent extends BsDatepickerAbstractComponent
  implements OnInit, OnDestroy {
  set value(value: Date) {
    if(this.datePickerMode=='month') {
      value = new Date(value.getFullYear(), value.getMonth());
    }
    if(this.datePickerMode=='year') {
      value = new Date(value.getFullYear(), 0);
    }
    this._effects.setValue(value);
  }
  valueChange: EventEmitter<Date> = new EventEmitter<Date>();

  _subs: Subscription[] = [];
  constructor(
    private _config: BsDatepickerConfig,
    private _store: BsDatepickerStore,
    private _actions: BsDatepickerActions,
    _effects: BsDatepickerEffects
  ) {
    super();
    this._effects = _effects;
  }

  ngOnInit(): void {
    this.containerClass = this._config.containerClass;
    this._effects
      .init(this._store)
      // intial state options
      .setOptions(this._config, this.datePickerMode)
      // data binding view --> model
      .setBindings(this)
      // set event handlers
      .setEventHandlers(this)
      .registerDatepickerSideEffects();

    // todo: move it somewhere else
    // on selected date change
    this._subs.push(
      this._store
        .select(state => state.selectedDate)
        .subscribe(date => this.valueChange.emit(date))
    );
  }

  daySelectHandler(day: DayViewModel): void {
    if (day.isOtherMonth || day.isDisabled) {
      return;
    }
    this._store.dispatch(this._actions.select(day.date));
  }

  monthSelectHandler(event: CalendarCellViewModel): void {
    this.value = event.date;
  }

  yearSelectHandler(event: CalendarCellViewModel): void {
    this.value = event.date;
  }
  
  ngOnDestroy(): void {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
    this._effects.destroy();
  }
}
