import { TimeUnit } from '../../bs-moment/types';

export type BsDatepickerViewMode = 'day' | 'month' | 'year';

/** *************** */
// days matrix: day view model
export interface DayViewModel {
  date: Date;
  label: string;
  // flag step
  isDisabled?: boolean;
  isHovered?: boolean;
  isOtherMonth?: boolean;
  isInRange?: boolean;
  isSelectionStart?: boolean;
  isSelectionEnd?: boolean;
  isSelected?: boolean;
  // day index
  monthIndex?: number;
  weekIndex?: number;
  dayIndex?: number;
}

export interface WeekViewModel {
  days: DayViewModel[];
}

// todo: split navigation settings
export interface DaysCalendarViewModel {
  weeks: WeekViewModel[];
  // additional information
  month: Date;
  weekNumbers: string[];
  weekdays: string[];
  // navigation details
  monthTitle: string;
  yearTitle: string;
  hideLeftArrow?: boolean;
  hideRightArrow?: boolean;
}

/** *************** */
// months matrix: month view model
export interface MonthViewModel {
  date: Date;
  label: string;
  isDisabled?: boolean;
  isHovered?: boolean;
}

// months calendar
export interface MonthsCalendarViewModel {
  months: MonthViewModel[][];
  // navigation
  monthTitle: string;
  yearTitle: string;
  hideLeftArrow?: boolean;
  hideRightArrow?: boolean;
}

/** *************** */
// years matrix: year view model
export interface YearViewModel {
  date: Date;
  label: string;
  isDisabled?: boolean;
  isHovered?: boolean;
}

// years calendar
export interface YearsCalendarViewModel {
  years: YearViewModel[][];
  // navigation
  monthTitle: string;
  yearTitle: string;
  hideLeftArrow?: boolean;
  hideRightArrow?: boolean;
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

/** *************** */
// events
/** *************** */
export enum BsNavigationDirection {UP, DOWN}

// used for navigation events, to change view date in state
export interface BsNavigationEvent {
  direction?: BsNavigationDirection;
  step?: TimeUnit;
}

export interface BsViewNavigationEvent {
  dateChange?: TimeUnit;
  viewMode: BsDatepickerViewMode;
}

// used to mark hovered day on days matrix
export interface DayHoverEvent {
  day: DayViewModel;
  isHovered: boolean;
}

// used to mark hovered month on months matrix
export interface MonthHoverEvent {
  month: MonthViewModel;
  isHovered: boolean;
}

// used to mark hovered year on months matrix
export interface YearHoverEvent {
  year: YearViewModel;
  isHovered: boolean;
}
