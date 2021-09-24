import {
  getDay,
  isFirstDayOfWeek,
  isAfter,
  isBefore,
  shiftDate,
  endOf,
  startOf,
  isArray,
  isSame
} from 'ngx-bootstrap/chronos';
import { BsDatepickerState } from '../reducer/bs-datepicker.state';
import { BsCustomDates } from '../themes/bs/bs-custom-dates-view.component';

export function getStartingDayOfCalendar(date: Date,
                                         options: { firstDayOfWeek?: number }): Date {
  if (isFirstDayOfWeek(date, options.firstDayOfWeek)) {
    return date;
  }

  const weekDay = getDay(date);
  const offset = calculateDateOffset(weekDay, options.firstDayOfWeek);

  return shiftDate(date, {day: -offset});
}

export function calculateDateOffset(weekday: number, startingDayOffset?: number): number {
  const _startingDayOffset = Number(startingDayOffset);
  if (isNaN(_startingDayOffset)) {
    return 0;
  }

  if (_startingDayOffset === 0) {
    return weekday;
  }

  const offset = weekday - _startingDayOffset % 7;

  return offset < 0 ? offset + 7 : offset;
}

export function isMonthDisabled(date: Date, min?: Date, max?: Date): boolean {
  const minBound = min && isBefore(endOf(date, 'month'), min, 'day');
  const maxBound = max && isAfter(startOf(date, 'month'), max, 'day');

  return minBound || maxBound || false;
}

export function isYearDisabled(date: Date, min?: Date, max?: Date): boolean {
  const minBound = min && isBefore(endOf(date, 'year'), min, 'day');
  const maxBound = max && isAfter(startOf(date, 'year'), max, 'day');

  return minBound || maxBound || false;
}

export function isDisabledDate(date?: Date, datesDisabled?: Date[], unit?: string): boolean {
  if (!datesDisabled  || !isArray(datesDisabled) || !datesDisabled.length) {
    return false;
  }

  if (unit && unit === 'year') {
    return datesDisabled.some((dateDisabled: Date) => isSame(date, dateDisabled, 'year'));
  }

  return datesDisabled.some((dateDisabled: Date) => isSame(date, dateDisabled, 'date'));
}

export function isEnabledDate(date?: Date, datesEnabled?: Date[], unit?: string): boolean {
  if (!datesEnabled || !isArray(datesEnabled) || !datesEnabled.length) {
    return false;
  }

  if (unit && unit === 'year') {
    return !datesEnabled.some((dateDisabled: Date) => isSame(date, dateDisabled, 'year'));
  }

  return !datesEnabled.some((enabledDate: Date) => isSame(date, enabledDate, 'date'));
}

export function getYearsCalendarInitialDate(state: BsDatepickerState, calendarIndex = 0): Date | undefined {
  const model = state && state.yearsCalendarModel && state.yearsCalendarModel[calendarIndex];

  return model?.years[0] && model.years[0][0] && model.years[0][0].date;
}

export function checkRangesWithMaxDate(ranges?: BsCustomDates[], maxDate?: Date): BsCustomDates[] | undefined {
  if (!ranges) return ranges;
  if (!maxDate) return ranges;
  if (!ranges.length && !ranges[0].value) return  ranges;

  ranges.forEach((item: BsCustomDates) => {
    if (!item || !item.value) return ranges;
    if (item.value instanceof Date) return  ranges;
    if (!(item.value instanceof Array && item.value.length) ) return ranges;
    item.value = compareDateWithMaxDateHelper(item.value, maxDate);
    return ranges;
  });
  return ranges;
}

export function checkBsValue(date?: Array<Date> | Date | (Date | undefined)[], maxDate?: Date): Array<Date> | Date | (Date|undefined)[] | undefined {
  if (!date) return date;
  if (!maxDate) return date;
  if (date instanceof Array && !date.length) return date;
  if (date instanceof Date) return  date;
  return compareDateWithMaxDateHelper(date, maxDate);
}

function compareDateWithMaxDateHelper <T>(date: T, maxDate: Date): T | Date[] {
  if (date instanceof Array) {
    const editedValues = date.map(item => {
      if (!item) return  item;
      if (isAfter(item, maxDate, 'date')) item = maxDate;
      return item;
    });
    return editedValues;
  }
  return date;
}

export function setCurrentTimeOnDateSelect(value?: Date): Date | undefined {
  if (!value) return value;

  return setCurrentTimeHelper(value);
}

export function setDateRangesCurrentTimeOnDateSelect(value?: (Date|undefined)[]): (Date|undefined)[] | undefined {
  if (!value?.length) return value;

  value.map((date) => {
    if (!date) {
      return date;
    }
    return setCurrentTimeHelper(date);
  });

  return value;
}

function setCurrentTimeHelper(date: Date): Date {
  const now = new Date();
  date.setMilliseconds(now.getMilliseconds());
  date.setSeconds(now.getSeconds());
  date.setMinutes(now.getMinutes());
  date.setHours(now.getHours());
  return date;
}
