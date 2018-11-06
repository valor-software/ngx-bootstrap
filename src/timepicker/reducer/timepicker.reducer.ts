import { Action } from 'ngx-bootstrap/mini-ngrx';
import {
  canChangeHours,
  canChangeMinutes,
  canChangeSeconds,
  canChangeValue,
  timepickerControls
} from '../timepicker-controls.util';
import { TimepickerConfig } from '../timepicker.config';
import {
  TimepickerComponentState,
  TimepickerControls
} from '../timepicker.models';
import { changeTime, setTime, isValidLimit } from '../timepicker.utils';
import { TimepickerActions } from './timepicker.actions';

export class TimepickerState {
  value: Date;
  config: TimepickerComponentState;
  controls: TimepickerControls;
}

export const initialState: TimepickerState = {
  value: null,
  config: new TimepickerConfig(),
  controls: {
    canIncrementHours: true,
    canIncrementMinutes: true,
    canIncrementSeconds: true,

    canDecrementHours: true,
    canDecrementMinutes: true,
    canDecrementSeconds: true,

    canToggleMeridian: true
  }
};
/* tslint:disable:cyclomatic-complexity */
export function timepickerReducer(state = initialState, action: Action) {
  switch (action.type) {
    case TimepickerActions.WRITE_VALUE: {
      return Object.assign({}, state, { value: action.payload });
    }

    case TimepickerActions.CHANGE_HOURS: {
      if (
        !canChangeValue(state.config, action.payload) ||
        !canChangeHours(action.payload, state.controls)
      ) {
        return state;
      }

      const _newTime = changeTime(state.value, { hour: action.payload.step });

      if ((state.config.max || state.config.min) && !isValidLimit(state.config, _newTime)) {
          return state;
      }

      return Object.assign({}, state, { value: _newTime });
    }

    case TimepickerActions.CHANGE_MINUTES: {
      if (
        !canChangeValue(state.config, action.payload) ||
        !canChangeMinutes(action.payload, state.controls)
      ) {
        return state;
      }

      const _newTime = changeTime(state.value, { minute: action.payload.step });

      if ((state.config.max || state.config.min) && !isValidLimit(state.config, _newTime)) {
        return state;
      }

      return Object.assign({}, state, { value: _newTime });
    }

    case TimepickerActions.CHANGE_SECONDS: {
      if (
        !canChangeValue(state.config, action.payload) ||
        !canChangeSeconds(action.payload, state.controls)
      ) {
        return state;
      }

      const _newTime = changeTime(state.value, {
        seconds: action.payload.step
      });

      if ((state.config.max || state.config.min) && !isValidLimit(state.config, _newTime)) {
        return state;
      }

      return Object.assign({}, state, { value: _newTime });
    }

    case TimepickerActions.SET_TIME_UNIT: {
      if (!canChangeValue(state.config)) {
        return state;
      }

      const _newTime = setTime(state.value, action.payload);

      return Object.assign({}, state, { value: _newTime });
    }

    case TimepickerActions.UPDATE_CONTROLS: {
      const _newControlsState = timepickerControls(state.value, action.payload);
      const _newState: TimepickerState = {
        value: state.value,
        config: action.payload,
        controls: _newControlsState
      };

      if (state.config.showMeridian !== _newState.config.showMeridian ||
        state.config.offset !== _newState.config.offset ||
        state.config.offsetTarget !== _newState.config.offsetTarget
      ) {
        if (state.value) {
          _newState.value = new Date(state.value);
        }
      }

      return Object.assign({}, state, _newState);
    }

    default:
      return state;
  }
}
/* tslint:enable:cyclomatic-complexity */
