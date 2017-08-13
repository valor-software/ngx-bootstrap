import { canChangeHours, canChangeMinutes, canChangeSeconds, canChangeValue, timepickerControls } from '../timepicker-controls.util';
import { TimepickerConfig } from '../timepicker.config';
import { changeTime, setTime } from '../timepicker.utils';
import { TimepickerActions } from './timepicker.actions';
export var TimepickerState = (function () {
    function TimepickerState() {
    }
    return TimepickerState;
}());
export var initialState = {
    config: new TimepickerConfig(),
    controls: {
        canIncrementHours: true,
        canIncrementMinutes: true,
        canIncrementSeconds: true,
        canDecrementHours: true,
        canDecrementMinutes: true,
        canDecrementSeconds: true
    }
};
export function timepickerReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case (TimepickerActions.WRITE_VALUE): {
            return Object.assign({}, state, { value: action.payload });
        }
        case (TimepickerActions.CHANGE_HOURS): {
            if (!canChangeValue(state.config, action.payload) ||
                !canChangeHours(action.payload, state.controls)) {
                return state;
            }
            var _newTime = changeTime(state.value, { hour: action.payload.step });
            return Object.assign({}, state, { value: _newTime });
        }
        case (TimepickerActions.CHANGE_MINUTES): {
            if (!canChangeValue(state.config, action.payload) ||
                !canChangeMinutes(action.payload, state.controls)) {
                return state;
            }
            var _newTime = changeTime(state.value, { minute: action.payload.step });
            return Object.assign({}, state, { value: _newTime });
        }
        case (TimepickerActions.CHANGE_SECONDS): {
            if (!canChangeValue(state.config, action.payload) ||
                !canChangeSeconds(action.payload, state.controls)) {
                return state;
            }
            var _newTime = changeTime(state.value, { seconds: action.payload.step });
            return Object.assign({}, state, { value: _newTime });
        }
        case (TimepickerActions.SET_TIME_UNIT): {
            if (!canChangeValue(state.config)) {
                return state;
            }
            var _newTime = setTime(state.value, action.payload);
            return Object.assign({}, state, { value: _newTime });
        }
        case (TimepickerActions.UPDATE_CONTROLS): {
            var _newControlsState = timepickerControls(state.value, action.payload);
            return Object.assign({}, state, {
                config: action.payload,
                controls: _newControlsState
            });
        }
        default:
            return state;
    }
}
//# sourceMappingURL=timepicker.reducer.js.map