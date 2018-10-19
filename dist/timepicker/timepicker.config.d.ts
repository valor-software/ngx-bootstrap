/** Provides default configuration values for timepicker */
export declare class TimepickerConfig {
    /** hours change step */
    hourStep: number;
    /** hours change step */
    minuteStep: number;
    /** seconds changes step */
    secondsStep: number;
    /** if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM */
    showMeridian: boolean;
    /** meridian labels based on locale */
    meridians: string[];
    /** if true hours and minutes fields will be readonly */
    readonlyInput: boolean;
    /** if true hours and minutes fields will be disabled */
    disabled: boolean;
    /** if true scroll inside hours and minutes inputs will change time */
    mousewheel: boolean;
    /** if true up/down arrowkeys inside hours and minutes inputs will change time */
    arrowkeys: boolean;
    /** if true spinner arrows above and below the inputs will be shown */
    showSpinners: boolean;
    /** show seconds in timepicker */
    showSeconds: boolean;
    /** show minutes in timepicker */
    showMinutes: boolean;
    /** minimum time user can select */
    min: Date;
    /** maximum time user can select */
    max: Date;
}
