import { TimeChangeEvent, TimepickerComponentState, TimepickerControls } from './timepicker.models';
export declare function canChangeValue(state: TimepickerComponentState, event?: TimeChangeEvent): boolean;
export declare function canChangeHours(event: TimeChangeEvent, controls: TimepickerControls): boolean;
export declare function canChangeMinutes(event: TimeChangeEvent, controls: TimepickerControls): boolean;
export declare function canChangeSeconds(event: TimeChangeEvent, controls: TimepickerControls): boolean;
export declare function getControlsValue(state: TimepickerComponentState): TimepickerComponentState;
export declare function timepickerControls(value: Date, state: TimepickerComponentState): TimepickerControls;
