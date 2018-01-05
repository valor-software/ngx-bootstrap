import { Injectable } from '@angular/core';
import { MiniStore } from '../../mini-ngrx/store.class';
import {
  BsDatepickerState,
  initialDatepickerState
} from './bs-datepicker.state';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Action } from '../../mini-ngrx/index';
import { MiniState } from '../../mini-ngrx/state.class';
import { bsDatepickerReducer } from './bs-datepicker.reducer';

@Injectable()
export class BsDatepickerStore extends MiniStore<BsDatepickerState> {
  constructor() {
    const _dispatcher = new BehaviorSubject<Action>({
      type: '[datepicker] dispatcher init'
    });
    const state = new MiniState<BsDatepickerState>(
      initialDatepickerState,
      _dispatcher,
      bsDatepickerReducer
    );
    super(_dispatcher, bsDatepickerReducer, state);
  }
}
