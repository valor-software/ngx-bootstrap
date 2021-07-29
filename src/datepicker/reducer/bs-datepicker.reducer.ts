import { BsDatepickerState, BsDatepickerViewState, initialDatepickerState } from './bs-datepicker.state';
import { Action } from 'ngx-bootstrap/mini-ngrx';
import { BsDatepickerActions } from './bs-datepicker.actions';
import { calcDaysCalendar } from '../engine/calc-days-calendar';
import { formatDaysCalendar } from '../engine/format-days-calendar';
import { flagDaysCalendar } from '../engine/flag-days-calendar';
import {
  setFullDate,
  shiftDate,
  isArray,
  isDateValid,
  startOf,
  getLocale,
  isAfter,
  isBefore,
  isSame
} from 'ngx-bootstrap/chronos';
import { canSwitchMode } from '../engine/view-mode';
import { formatMonthsCalendar } from '../engine/format-months-calendar';
import { flagMonthsCalendar } from '../engine/flag-months-calendar';
import { formatYearsCalendar, initialYearShift, yearsPerCalendar } from '../engine/format-years-calendar';
import { flagYearsCalendar } from '../engine/flag-years-calendar';
import { BsViewNavigationEvent, DatepickerFormatOptions, BsDatepickerViewMode } from '../models';
import { getYearsCalendarInitialDate } from '../utils/bs-calendar-utils';


export function bsDatepickerReducer(state: BsDatepickerState = initialDatepickerState,
                                    action: Action): BsDatepickerState {
  switch (action.type) {
    case BsDatepickerActions.CALCULATE: {
      return calculateReducer(state);
    }

    case BsDatepickerActions.FORMAT: {
      return formatReducer(state);
    }

    case BsDatepickerActions.FLAG: {
      return flagReducer(state);
    }

    case BsDatepickerActions.NAVIGATE_OFFSET: {
      return navigateOffsetReducer(state, action);
    }

    case BsDatepickerActions.NAVIGATE_TO: {
      const payload: BsViewNavigationEvent = action.payload;
      if (!state.view || !payload.unit) {
        return state;
      }

      const date = setFullDate(state.view.date, payload.unit);
      let newState;
      let mode: BsDatepickerViewMode;
      if (canSwitchMode(payload.viewMode, state.minMode)) {
        mode = payload.viewMode;
        newState = { view: { date, mode } };
      } else {
        mode = state.view.mode;
        newState = { selectedDate: date, view: { date, mode } };
      }

      return Object.assign({}, state, newState);
    }

    case BsDatepickerActions.CHANGE_VIEWMODE: {
      if (!canSwitchMode(action.payload, state.minMode) || !state.view) {
        return state;
      }

      const date = state.view.date;
      const mode = action.payload;
      const newState = { view: { date, mode } };

      return Object.assign({}, state, newState);
    }

    case BsDatepickerActions.HOVER: {
      return Object.assign({}, state, { hoveredDate: action.payload });
    }

    case BsDatepickerActions.SELECT: {
      if (!state.view) {
        return state;
      }

      const newState = {
        selectedDate: action.payload,
        view: state.view
      };

      const mode = state.view.mode;
      const _date = action.payload || state.view.date;
      const date = getViewDate(_date, state.minDate, state.maxDate);
      newState.view = { mode, date };

      return Object.assign({}, state, newState);
    }

    case BsDatepickerActions.SET_OPTIONS: {
      if (!state.view) {
        return state;
      }

      const newState = action.payload;
      // preserve view mode
      const mode = newState.minMode ? newState.minMode : state.view.mode;
      const _viewDate = isDateValid(newState.value) && newState.value
        || isArray(newState.value) && isDateValid(newState.value[0]) && newState.value[0]
        || state.view.date;
      const date = getViewDate(_viewDate, newState.minDate, newState.maxDate);
      newState.view = { mode, date };
      // update selected value
      if (newState.value) {
        // if new value is array we work with date range
        if (isArray(newState.value)) {
          newState.selectedRange = newState.value;
        }

        // if new value is a date -> datepicker
        if (newState.value instanceof Date) {
          newState.selectedDate = newState.value;
        }

        // provided value is not supported :)
        // need to report it somehow
      }

      return Object.assign({}, state, newState);
    }

    // date range picker
    case BsDatepickerActions.SELECT_RANGE: {
      if (!state.view) {
        return state;
      }

      const newState = {
        selectedRange: action.payload,
        view: state.view
      };

      const mode = state.view.mode;
      const _date = action.payload && action.payload[0] || state.view.date;
      const date = getViewDate(_date, state.minDate, state.maxDate);
      newState.view = { mode, date };

      return Object.assign({}, state, newState);
    }

    case BsDatepickerActions.SET_MIN_DATE: {
      return Object.assign({}, state, {
        minDate: action.payload
      });
    }
    case BsDatepickerActions.SET_MAX_DATE: {
      return Object.assign({}, state, {
        maxDate: action.payload
      });
    }
    case BsDatepickerActions.SET_IS_DISABLED: {
      return Object.assign({}, state, {
        isDisabled: action.payload
      });
    }
    case BsDatepickerActions.SET_DATE_CUSTOM_CLASSES: {
      return Object.assign({}, state, {
        dateCustomClasses: action.payload
      });
    }
    case BsDatepickerActions.SET_DATE_TOOLTIP_TEXTS: {
      return Object.assign({}, state, {
        dateTooltipTexts: action.payload
      });
    }

    default:
      return state;
  }
}

function calculateReducer(state: BsDatepickerState): BsDatepickerState {
  if (!state.view) {
    return state;
  }

  // how many calendars
  let displayMonths: number | undefined;
  if (state.displayOneMonthRange &&
    isDisplayOneMonth(state.view.date, state.minDate, state.maxDate)) {
    displayMonths = 1;
  } else {
    displayMonths = state.displayMonths || 1;
  }

  // use selected date on initial rendering if set
  let viewDate = state.view.date;

  if (state.view.mode === 'day' && state.monthViewOptions) {
    if (state.showPreviousMonth && state.selectedRange && state.selectedRange.length === 0) {
      viewDate = shiftDate(viewDate, { month: -1 });
    }

    state.monthViewOptions.firstDayOfWeek = getLocale(state.locale).firstDayOfWeek();
    let monthsModel = new Array(displayMonths);
    for (let monthIndex = 0; monthIndex < displayMonths; monthIndex++) {
      // todo: for unlinked calendars it will be harder
      monthsModel[monthIndex] = calcDaysCalendar(
        viewDate,
        state.monthViewOptions
      );
      viewDate = shiftDate(viewDate, { month: 1 });
    }
    // Check if parameter enabled and check if it's not months navigation event
    if (state.preventChangeToNextMonth && state.flaggedMonths && state.hoveredDate) {
      const viewMonth = calcDaysCalendar(state.view.date, state.monthViewOptions);
      // Check if viewed right month same as in flaggedMonths state, then override months model with flaggedMonths
      if (state.flaggedMonths.length && state.flaggedMonths[1].month.getMonth() === viewMonth.month.getMonth()) {
        monthsModel = state.flaggedMonths
          .map(item => {
            if (state.monthViewOptions) {
              return calcDaysCalendar(
                item.month,
                state.monthViewOptions
              );
            }
            return null;
          })
          .filter(item => item !== null);
      }
    }

    return Object.assign({}, state, { monthsModel });
  }

  if (state.view.mode === 'month') {
    const monthsCalendar = new Array(displayMonths);
    for (
      let calendarIndex = 0;
      calendarIndex < displayMonths;
      calendarIndex++
    ) {
      // todo: for unlinked calendars it will be harder
      monthsCalendar[calendarIndex] = formatMonthsCalendar(
        viewDate,
        getFormatOptions(state)
      );
      viewDate = shiftDate(viewDate, { year: 1 });
    }

    return Object.assign({}, state, { monthsCalendar });
  }

  if (state.view.mode === 'year') {
    const yearsCalendarModel = new Array(displayMonths);

    for (
      let calendarIndex = 0;
      calendarIndex < displayMonths;
      calendarIndex++
    ) {
      // todo: for unlinked calendars it will be harder
      yearsCalendarModel[calendarIndex] = formatYearsCalendar(
        viewDate,
        getFormatOptions(state),
        state.minMode === 'year' ? getYearsCalendarInitialDate(state, calendarIndex) : undefined
      );
      viewDate = shiftDate(viewDate, { year: yearsPerCalendar });
    }

    return Object.assign({}, state, { yearsCalendarModel });
  }

  return state;
}

function formatReducer(state: BsDatepickerState): BsDatepickerState {
  if (!state.view) {
    return state;
  }

  if (state.view.mode === 'day' && state.monthsModel) {
    const formattedMonths = state.monthsModel.map((month, monthIndex) =>
      formatDaysCalendar(month, getFormatOptions(state), monthIndex)
    );

    return Object.assign({}, state, { formattedMonths });
  }

  // how many calendars
  const displayMonths = state.displayMonths || 1;
  // check initial rendering
  // use selected date on initial rendering if set
  let viewDate = state.view.date;

  if (state.view.mode === 'month') {
    const monthsCalendar = new Array(displayMonths);
    for (
      let calendarIndex = 0;
      calendarIndex < displayMonths;
      calendarIndex++
    ) {
      // todo: for unlinked calendars it will be harder
      monthsCalendar[calendarIndex] = formatMonthsCalendar(
        viewDate,
        getFormatOptions(state)
      );
      viewDate = shiftDate(viewDate, { year: 1 });
    }

    return Object.assign({}, state, { monthsCalendar });
  }

  if (state.view.mode === 'year') {
    const yearsCalendarModel = new Array(displayMonths);
    for (
      let calendarIndex = 0;
      calendarIndex < displayMonths;
      calendarIndex++
    ) {
      // todo: for unlinked calendars it will be harder
      yearsCalendarModel[calendarIndex] = formatYearsCalendar(
        viewDate,
        getFormatOptions(state)
      );
      viewDate = shiftDate(viewDate, { year: 16 });
    }

    return Object.assign({}, state, { yearsCalendarModel });
  }

  return state;
}

function flagReducer(state: BsDatepickerState): BsDatepickerState {
  if (!state.view) {
    return state;
  }

  const displayMonths = isDisplayOneMonth(state.view.date, state.minDate, state.maxDate) ? 1 : state.displayMonths;
  if (state.formattedMonths && state.view.mode === 'day') {
    const flaggedMonths = state.formattedMonths.map(
      (formattedMonth, monthIndex) =>
        flagDaysCalendar(formattedMonth, {
          isDisabled: state.isDisabled,
          minDate: state.minDate,
          maxDate: state.maxDate,
          daysDisabled: state.daysDisabled,
          datesDisabled: state.datesDisabled,
          datesEnabled: state.datesEnabled,
          hoveredDate: state.hoveredDate,
          selectedDate: state.selectedDate,
          selectedRange: state.selectedRange,
          displayMonths,
          dateCustomClasses: state.dateCustomClasses,
          dateTooltipTexts: state.dateTooltipTexts,
          monthIndex
        })
    );

    return Object.assign({}, state, { flaggedMonths });
  }

  if (state.view.mode === 'month' && state.monthsCalendar) {
    const flaggedMonthsCalendar = state.monthsCalendar.map(
      (formattedMonth, monthIndex) =>
        flagMonthsCalendar(formattedMonth, {
          isDisabled: state.isDisabled,
          minDate: state.minDate,
          maxDate: state.maxDate,
          hoveredMonth: state.hoveredMonth,
          selectedDate: state.selectedDate,
          selectedRange: state.selectedRange,
          displayMonths,
          monthIndex
        })
    );

    return Object.assign({}, state, { flaggedMonthsCalendar });
  }

  if (state.view.mode === 'year' && state.yearsCalendarModel) {
    const yearsCalendarFlagged = state.yearsCalendarModel.map(
      (formattedMonth, yearIndex) =>
        flagYearsCalendar(formattedMonth, {
          isDisabled: state.isDisabled,
          minDate: state.minDate,
          maxDate: state.maxDate,
          hoveredYear: state.hoveredYear,
          selectedDate: state.selectedDate,
          selectedRange: state.selectedRange,
          displayMonths,
          yearIndex
        })
    );

    return Object.assign({}, state, { yearsCalendarFlagged });
  }

  return state;
}

function navigateOffsetReducer(state: BsDatepickerState, action: Action): BsDatepickerState {
  if (!state.view) {
    return state;
  }

  const date = shiftViewDate(state, action);
  if (!date) {
    return state;
  }

  const newState: {view: BsDatepickerViewState} = {
    view: {
      mode: state.view.mode,
      date
    }
  };

  return Object.assign({}, state, newState);
}

function shiftViewDate(state: BsDatepickerState, action: Action): Date | undefined {
  if (!state.view) {
    return undefined;
  }

  if (state.view.mode === 'year' && state.minMode === 'year') {
    const initialDate = getYearsCalendarInitialDate(state, 0);
    if (initialDate) {
      const middleDate = shiftDate(initialDate, { year: -initialYearShift });
      return shiftDate(middleDate, action.payload);
    }
  }

  return shiftDate(startOf(state.view.date, 'month'), action.payload);
}

function getFormatOptions(state: BsDatepickerState): DatepickerFormatOptions {
  return {
    locale: state.locale,

    monthTitle: state.monthTitle,
    yearTitle: state.yearTitle,

    dayLabel: state.dayLabel,
    monthLabel: state.monthLabel,
    yearLabel: state.yearLabel,

    weekNumbers: state.weekNumbers
  };
}

/**
 * if view date is provided (bsValue|ngModel) it should be shown
 * if view date is not provider:
 * if minDate>currentDate (default view value), show minDate
 * if maxDate<currentDate(default view value) show maxDate
 */
function getViewDate(viewDate: Date | Date[], minDate?: Date, maxDate?: Date) {
  const _date = Array.isArray(viewDate) ? viewDate[0] : viewDate;

  if (minDate && isAfter(minDate, _date, 'day')) {
    return minDate;
  }

  if (maxDate && isBefore(maxDate, _date, 'day')) {
    return maxDate;
  }

  return _date;
}

function isDisplayOneMonth(viewDate: Date, minDate?: Date, maxDate?: Date) {
  if (maxDate && isSame(maxDate, viewDate, 'day')) {
    return true;
  }

  return minDate && maxDate && minDate.getMonth() === maxDate.getMonth();
}
