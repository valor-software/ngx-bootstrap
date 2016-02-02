/// <reference path="../../../tsd.d.ts" />
export declare class DatepickerDemo {
    dt: Date;
    private minDate;
    private events;
    private tomorrow;
    private afterTomorrow;
    private formats;
    private format;
    private dateOptions;
    private opened;
    constructor();
    getDate(): number;
    private today();
    private d20090824();
    private getDayClass(date, mode);
    private disabled(date, mode);
    private open();
    private clear();
    private toggleMin();
}
