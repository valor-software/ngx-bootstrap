export declare class DatepickerDemoComponent {
    dt: Date;
    minDate: Date;
    events: Array<any>;
    tomorrow: Date;
    afterTomorrow: Date;
    formats: Array<string>;
    format: string;
    dateOptions: any;
    private opened;
    constructor();
    getDate(): number;
    today(): void;
    d20090824(): void;
    getDayClass(date: any, mode: string): string;
    disabled(date: Date, mode: string): boolean;
    open(): void;
    clear(): void;
    toggleMin(): void;
}
