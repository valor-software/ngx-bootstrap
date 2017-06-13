import { Injectable } from '@angular/core';
import { TimeUnit } from '../timepicker.models';
import { Action } from '../../mini-ngrx/index';

@Injectable()
export class TimepickerActions {
  static readonly WRITE_VALUE = '[timepicker] write value from ng model';
  static readonly CHANGE_HOURS = '[timepicker] change hours';
  static readonly CHANGE_MINUTES = '[timepicker] change minutes';
  static readonly CHANGE_SECONDS = '[timepicker] change seconds';
  static readonly SET_TIME_UNIT = '[timepicker] set time unit';

  writeValue(value: Date | string) {
    return {
      type: TimepickerActions.WRITE_VALUE,
      payload: value
    };
  }

  changeHours(value: number) {
    return {
      type: TimepickerActions.CHANGE_HOURS,
      payload: value
    };
  }

  changeMinutes(value: number) {
    return {
      type: TimepickerActions.CHANGE_MINUTES,
      payload: value
    };
  }

  changeSeconds(value: number): Action {
    return {
      type: TimepickerActions.CHANGE_SECONDS,
      payload: value
    };
  }

  setTimeUnit(value: TimeUnit): Action {
    return {
      type: TimepickerActions.SET_TIME_UNIT,
      payload: value
    };
  }
}
