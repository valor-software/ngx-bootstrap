import { TimeUnit } from 'ngx-bootstrap/chronos';

export type BsDatepickerViewMode = 'day' | 'month' | 'year';

/** *************** */
// navigation bar settings
export interface NavigationViewModel {
  monthTitle: string;
  yearTitle: string;
  hideLeftArrow?: boolean;
  hideRightArrow?: boolean;
  disableLeftArrow?: boolean;
  disableRightArrow?: boolean;
}

export interface CalendarCellViewModel {
  date: Date;
  label: string;
  isDisabled?: boolean;
  isHovered?: boolean;
  isSelected?: boolean;
}

/** *************** */
// days matrix: day cell view model
export interface DayViewModel extends CalendarCellViewModel {
  isOtherMonthHovered?: boolean;
  isOtherMonth?: boolean;
  isInRange?: boolean;
  isSelectionStart?: boolean;
  isSelectionEnd?: boolean;
  isToday?: boolean;
  customClasses?: string;
  tooltipText?: string;
  // day index
  monthIndex?: number;
  weekIndex?: number;
  dayIndex?: number;
}

export interface WeekViewModel {
  days: DayViewModel[];
  isHovered?: boolean;
}

// todo: split navigation settings
export interface DaysCalendarViewModel extends NavigationViewModel {
  weeks: WeekViewModel[];
  // additional information
  month: Date;
  weekNumbers: string[];
  weekdays: string[];
}

/** *************** */
// months calendar
export interface MonthsCalendarViewModel extends NavigationViewModel {
  months: CalendarCellViewModel[][];
}

/** *************** */
// years calendar
export interface YearsCalendarViewModel extends NavigationViewModel {
  years: CalendarCellViewModel[][];
}

/** *************** */

// math model
/** *************** */

// days Date's array
export interface DaysCalendarModel {
  daysMatrix: Date[][];
  month: Date;
}

/** *************** */
// some func options
export interface MonthViewOptions {
  width?: number;
  height?: number;
  firstDayOfWeek?: number;
}

/** *************** */
// rendering options
export interface DatepickerFormatOptions {
  locale: string;

  monthTitle: string;
  yearTitle: string;

  dayLabel: string;
  monthLabel: string;
  yearLabel: string;

  weekNumbers: string;
}

export interface DatepickerRenderOptions {
  showWeekNumbers?: boolean;
  displayMonths?: number;
}

export interface DatepickerDateCustomClasses {
  date: Date;
  classes: string[];
}

export interface DatepickerDateTooltipText {
  date: Date;
  tooltipText: string;
}

/** *************** */
// events
/** *************** */
export enum BsNavigationDirection {
  UP,
  DOWN
}

// used for navigation events, to change view date in state
export interface BsNavigationEvent {
  direction?: BsNavigationDirection;
  step?: TimeUnit;
}

export interface BsViewNavigationEvent {
  unit?: TimeUnit;
  viewMode: BsDatepickerViewMode;
}

export interface CellHoverEvent {
  cell: CalendarCellViewModel;
  isHovered: boolean;
}
