export declare function getStartingDayOfCalendar(date: Date, options: {
    firstDayOfWeek?: number;
}): Date;
export declare function calculateDateOffset(weekday: number, startingDayOffset: number): number;
export declare function isMonthDisabled(date: Date, min: Date, max: Date): boolean;
export declare function isYearDisabled(date: Date, min: Date, max: Date): boolean;
