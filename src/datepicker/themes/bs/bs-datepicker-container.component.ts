import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BsDatepickerAbstractComponent } from '../../base/bs-datepicker-container';

import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { DayViewModel } from '../../models/index';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { Subscription } from 'rxjs';
import { BsCustomDates } from '../../bs-customdates';

@Component({
  selector: 'bs-datepicker-container',
  providers: [BsDatepickerStore, BsDatepickerEffects],
  templateUrl: './bs-datepicker-view.html',
  host: {
    '(click)': '_stopPropagation($event)',
    style: 'position: absolute; display: block;',
    role: 'dialog',
    'aria-label': 'calendar'
  }
})
export class BsDatepickerContainerComponent extends BsDatepickerAbstractComponent
  implements OnInit, OnDestroy {
  set value(value: Date) {
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
      .setOptions(this._config)
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

    this.customDates = this._config.customDates;
  }

  daySelectHandler(day: DayViewModel): void {
    if (day.isOtherMonth || day.isDisabled) {
      return;
    }
    this._store.dispatch(this._actions.select(day.date));
  }

  ngOnDestroy(): void {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
    this._effects.destroy();
  }

  onCustomDateSelect(bsCustomDate: BsCustomDates) {
    this._store.dispatch(this._actions.select(<any>bsCustomDate.value));
  }
}
