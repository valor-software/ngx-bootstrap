export interface Time {
    hour?: string | number;
    minute?: string | number;
    seconds?: string | number;
    isPM?: boolean;
}
export interface TimepickerControls {
    canIncrementHours: boolean;
    canIncrementMinutes: boolean;
    canIncrementSeconds: boolean;
    canDecrementHours: boolean;
    canDecrementMinutes: boolean;
    canDecrementSeconds: boolean;
}
export interface TimepickerComponentState {
    min: Date;
    max: Date;
    hourStep: number;
    minuteStep: number;
    secondsStep: number;
    readonlyInput: boolean;
    mousewheel: boolean;
    arrowkeys: boolean;
    showSpinners: boolean;
    showMeridian: boolean;
    showSeconds: boolean;
    meridians: string[];
}
export declare type TimeChangeSource = 'wheel' | 'key' | '';
export interface TimeChangeEvent {
    step: number;
    source: TimeChangeSource;
}
