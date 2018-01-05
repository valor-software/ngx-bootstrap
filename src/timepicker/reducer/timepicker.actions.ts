import { Injectable } from '@angular/core';
import { Action } from '../../mini-ngrx/index';
import {
  TimeChangeEvent,
  TimepickerComponentState,
  Time
} from '../timepicker.models';

@Injectable()
export class TimepickerActions {
  static readonly WRITE_VALUE = '[timepicker] write value from ng model';
  static readonly CHANGE_HOURS = '[timepicker] change hours';
  static readonly CHANGE_MINUTES = '[timepicker] change minutes';
  static readonly CHANGE_SECONDS = '[timepicker] change seconds';
  static readonly SET_TIME_UNIT = '[timepicker] set time unit';
  static readonly UPDATE_CONTROLS = '[timepicker] update controls';

  writeValue(value: Date | string) {
    return {
      type: TimepickerActions.WRITE_VALUE,
      payload: value
    };
  }

  changeHours(event: TimeChangeEvent) {
    return {
      type: TimepickerActions.CHANGE_HOURS,
      payload: event
    };
  }

  changeMinutes(event: TimeChangeEvent) {
    return {
      type: TimepickerActions.CHANGE_MINUTES,
      payload: event
    };
  }

  changeSeconds(event: TimeChangeEvent): Action {
    return {
      type: TimepickerActions.CHANGE_SECONDS,
      payload: event
    };
  }

  setTime(value: Time): Action {
    return {
      type: TimepickerActions.SET_TIME_UNIT,
      payload: value
    };
  }

  updateControls(value: TimepickerComponentState): Action {
    return {
      type: TimepickerActions.UPDATE_CONTROLS,
      payload: value
    };
  }
}
