import { Injectable } from '@angular/core';
import { BsDatepickerStore } from './bs-datepicker.store';
import { BsDatepickerActions } from './bs-datepicker.actions';

@Injectable()
export class BsDatepickerEffects {
  // constructor(private _bsDatepickerStore: BsDatepickerStore,
  //             private _actions: BsDatepickerActions) {
  //   this.onMonthCalendarCalculation();
  // }
  //
  // onMonthCalendarCalculation() {
  //   this._bsDatepickerStore
  //     .select(state => state.monthModel)
  //     .filter(monthModel => !!monthModel)
  //     .subscribe(month =>
  //       this._bsDatepickerStore.dispatch(this._actions.format()));
  // }
}
