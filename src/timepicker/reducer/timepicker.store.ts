import { Injectable } from '@angular/core';
import {
  timepickerReducer,
  TimepickerState,
  initialState
} from './timepicker.reducer';
import { BehaviorSubject } from 'rxjs';

import { Action, MiniStore, MiniState } from 'ngx-bootstrap/mini-ngrx';

@Injectable()
export class TimepickerStore extends MiniStore<TimepickerState> {
  constructor() {
    const _dispatcher = new BehaviorSubject<Action>({
      type: '[mini-ngrx] dispatcher init'
    });
    const state = new MiniState<TimepickerState>(
      initialState,
      _dispatcher,
      timepickerReducer
    );
    super(_dispatcher, timepickerReducer, state);
  }
}
