import { Action } from '../../mini-ngrx/index';
import { TimeChangeEvent, TimepickerComponentState, Time } from '../timepicker.models';
export declare class TimepickerActions {
    static readonly WRITE_VALUE: string;
    static readonly CHANGE_HOURS: string;
    static readonly CHANGE_MINUTES: string;
    static readonly CHANGE_SECONDS: string;
    static readonly SET_TIME_UNIT: string;
    static readonly UPDATE_CONTROLS: string;
    writeValue(value: Date | string): {
        type: string;
        payload: string | Date;
    };
    changeHours(event: TimeChangeEvent): {
        type: string;
        payload: TimeChangeEvent;
    };
    changeMinutes(event: TimeChangeEvent): {
        type: string;
        payload: TimeChangeEvent;
    };
    changeSeconds(event: TimeChangeEvent): Action;
    setTime(value: Time): Action;
    updateControls(value: TimepickerComponentState): Action;
}
