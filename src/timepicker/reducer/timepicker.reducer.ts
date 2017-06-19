import { TimepickerActions } from './timepicker.actions';
import { changeTime, setTime } from '../timepicker.utils';
import { Action } from '../../mini-ngrx/index';

export interface TimepickerState {
  value: Date;
}

export const initialState = {} as TimepickerState;

export function timepickerReducer(state = initialState, action: Action) {
  switch (action.type) {
    case(TimepickerActions.WRITE_VALUE): {
      return Object.assign({}, state, {value: action.payload});
    }
    case (TimepickerActions.CHANGE_HOURS): {
      const _newTime = changeTime(state.value, {hour: action.payload});

      return Object.assign({}, state, {value: _newTime});
    }
    case (TimepickerActions.CHANGE_MINUTES): {
      const _newTime = changeTime(state.value, {minute: action.payload});

      return Object.assign({}, state, {value: _newTime});
    }
    case (TimepickerActions.CHANGE_SECONDS): {
      const _newTime = changeTime(state.value, {seconds: action.payload});

      return Object.assign({}, state, {value: _newTime});
    }
    case (TimepickerActions.SET_TIME_UNIT): {
      const _newTime = setTime(state.value, action.payload);

      return Object.assign({}, state, {value: _newTime});
    }
    default:
      return state;
  }
}
