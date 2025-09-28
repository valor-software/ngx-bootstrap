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
import { BsViewNavigationEvent, DatepickerFormatOptions, BsDatepickerViewMode, DaysCalendarViewModel, MonthsCalendarViewModel, YearsCalendarViewModel } from '../models';
import { getYearsCalendarInitialDate } from '../utils/bs-calendar-utils';
import { copyTime } from '../utils/copy-time-utils';


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
      const payload: BsViewNavigationEvent = action.payload.event;
      if (!state.view || !payload.unit) {
        return state;
      }

      const date = setFullDate(state.view.date, payload.unit);
      let newState;
      let mode: BsDatepickerViewMode;
      if (canSwitchMode(payload.viewMode, state.minMode)) {
        mode = payload.viewMode;
        newState = { view: { date, mode, source: action.payload.source } };
      } else {
        mode = state.view.mode;
        newState = { selectedDate: date, view: { date, mode, source: action.payload.source } };
      }
      return Object.assign({}, state, newState);
    }

    case BsDatepickerActions.CHANGE_VIEWMODE: {
      if (!canSwitchMode(action.payload.event, state.minMode) || !state.view) {
        return state;
      }

      const date = state.view.date;
      const mode = action.payload.event;
      const newState = { view: { date, mode, source: action.payload.source } };
      return Object.assign({}, state, newState);
    }

    case BsDatepickerActions.HOVER: {
      return Object.assign({}, state, { hoveredDate: action.payload });
    }

    case BsDatepickerActions.SELECT: {
      if (!state.view) {
        return state;
      }
      const source = action.payload.source;
      const newState = {
        selectedDate: action.payload.date,
        view: state.view,
        source: source,
      };

      if (Array.isArray(state.selectedTime)) {
        const _time = state.selectedTime[0];
        if (newState.selectedDate && _time) {
          copyTime(newState.selectedDate, _time);
        }
      }

      const mode = state.viewStates != null && source != null ? state.viewStates[source].mode : state.view.mode;
      const _date = action.payload.date || state.view.date;
      const date = getViewDate(_date, state.minDate, state.maxDate);
      newState.view = { mode, date };

      return Object.assign({}, state, newState);
    }

    case BsDatepickerActions.SELECT_TIME: {
      const {date, index, source} = action.payload;
      const selectedTime = state.selectedTime ? [...state.selectedTime] : [];
      selectedTime[index] = date;
      return Object.assign({}, state, { selectedTime, source });
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
          newState.selectedTime = newState.value.map((i: Date) => i);
        }

        // if new value is a date -> datepicker
        if (newState.value instanceof Date) {
          newState.selectedDate = newState.value;
          newState.selectedTime = [newState.value];
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
        selectedRange: action.payload.value,
        view: state.view,
      };
      newState.selectedRange?.forEach((dte: Date, index: number) => {
        if (Array.isArray(state.selectedTime)) {
          const _time = state.selectedTime[index];
          if (_time) {
            copyTime(dte, _time);
          }
        }
      });
      const source = action.payload.source;
      const mode = state.viewStates != null && source != null ? state.viewStates[source].mode : state.view.mode;
      const _date = action.payload.value && action.payload.value[0] || state.view.date;
      const date = getViewDate(_date, state.minDate, state.maxDate);
      newState.view = { mode, date, source };

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
  const source = state.view.source;
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

  if (state.viewStates == null) {
    state.viewStates = new Array(displayMonths);
  }
  let monthsModel = new Array(displayMonths);
  const monthsCalendar = new Array(displayMonths);
  const yearsCalendarModel = new Array(displayMonths);
  for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
    if (source != null && state.viewStates?.length > calendarIndex && state.viewStates[calendarIndex] != null)  {
      if(state.unlinkedCalendars) {
        if (source == calendarIndex) {
          state.viewStates[calendarIndex].mode = state.view.mode;
        }
      } else {
        state.viewStates[calendarIndex].mode = state.view.mode;
      }
    }
    const checkedMode = state.viewStates?.length > calendarIndex  ? state.viewStates[calendarIndex]?.mode ?? state.view.mode : state.view.mode;
    if (checkedMode === 'day' && state.monthViewOptions != null) {
      if (calendarIndex == 0) {
        if (!state.unlinkedCalendars && state.showPreviousMonth && state.selectedRange && state.selectedRange.length === 0) {
          viewDate = shiftDate(viewDate, { month: -1 });
        }
        state.monthViewOptions.firstDayOfWeek = getLocale(state.locale).firstDayOfWeek();
      }
      if (source != null && state.unlinkedCalendars) {
        viewDate = state.viewStates[calendarIndex].date;
        if (calendarIndex == source) {
          viewDate = shiftDate(viewDate, { month: state.view.direction });
          state.viewStates[calendarIndex] = { date: viewDate, mode: 'day' };
        }
        monthsModel[calendarIndex] = calcDaysCalendar(
          viewDate,
          state.monthViewOptions
        );
      } else {
        if(calendarIndex == displayMonths -1 && state.unlinkedCalendars && (state.selectedRange ?? []).length == 2) {
          viewDate = state.selectedRange![1];
        }
        monthsModel[calendarIndex] = calcDaysCalendar(
          viewDate,
          state.monthViewOptions
        );
        state.viewStates[calendarIndex] = { date: viewDate, mode: 'day' };
        viewDate = shiftDate(viewDate, { month: 1 });
      }
      // Check if parameter enabled and check if it's not months navigation event
      if ((calendarIndex == displayMonths -1) && !state.unlinkedCalendars && state.preventChangeToNextMonth && state.flaggedMonths && state.hoveredDate) {
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
    }
    if (checkedMode === 'month') {
      if (source != null && state.unlinkedCalendars) {
        viewDate = state.viewStates[calendarIndex].date;
        if (calendarIndex == source) {
          viewDate = shiftDate(viewDate, { year: state.view.direction });
          state.viewStates[calendarIndex] = { date: viewDate, mode: 'month' };
        }
        monthsCalendar[calendarIndex] = formatMonthsCalendar(
          viewDate,
          getFormatOptions(state)
        );
      } else {
        monthsCalendar[calendarIndex] = formatMonthsCalendar(
          viewDate,
          getFormatOptions(state)
        );
        state.viewStates[calendarIndex] = { date: viewDate, mode: 'month' };
        viewDate = shiftDate(viewDate, { year: 1 });
      }
    }
    if (checkedMode === 'year') {
      if (source != null && state.unlinkedCalendars) {
        viewDate = state.viewStates[calendarIndex].date;
        if (calendarIndex == source) {
          viewDate = shiftDate(viewDate, { year: state.view.direction });
          state.viewStates[calendarIndex] = { date: viewDate, mode: 'year' };
        }
        yearsCalendarModel[calendarIndex] = formatYearsCalendar(
          viewDate,
          getFormatOptions(state),
          state.minMode === 'year' ? getYearsCalendarInitialDate(state, calendarIndex) : undefined
        );
      } else {
        yearsCalendarModel[calendarIndex] = formatYearsCalendar(
          viewDate,
          getFormatOptions(state),
          state.minMode === 'year' ? getYearsCalendarInitialDate(state, calendarIndex) : undefined
        );
        state.viewStates[calendarIndex] = { date: viewDate, mode: 'year' };
        viewDate = shiftDate(viewDate, { year: yearsPerCalendar });
      }
    }
  }
  return Object.assign({}, state, { monthsModel, monthsCalendar, yearsCalendarModel });
}

function formatReducer(state: BsDatepickerState): BsDatepickerState {
  if (!state.view) {
    return state;
  }
  const displayMonths = state.displayMonths || 1;

  const formattedMonths: DaysCalendarViewModel[] = new Array(displayMonths);
  const monthsCalendar: MonthsCalendarViewModel[] = new Array(displayMonths);
  const yearsCalendarModel: YearsCalendarViewModel[] = new Array(displayMonths);
  for (
    let calendarIndex = 0;
    calendarIndex < displayMonths;
    calendarIndex++
  ) {
    const viewState =  (state.viewStates != null && state.viewStates?.length > calendarIndex) ? state.viewStates[calendarIndex] : state.view;
    const checkedMode = viewState.mode;
    if (checkedMode === 'day' && state.monthsModel) {
      formattedMonths[calendarIndex] = formatDaysCalendar(state.monthsModel[calendarIndex], getFormatOptions(state), calendarIndex)
    }
    // how many calendars
    // check initial rendering
    // use selected date on initial rendering if set
    let viewDate = viewState.date;
    if (checkedMode === 'month') {
      // todo: for unlinked calendars it will be harder
      monthsCalendar[calendarIndex] = formatMonthsCalendar(
        viewDate,
        getFormatOptions(state)
      );
      viewDate = shiftDate(viewDate, { year: 1 });
    }

    if (checkedMode === 'year') {
      yearsCalendarModel[calendarIndex] = formatYearsCalendar(
        viewDate,
        getFormatOptions(state)
      );
      viewDate = shiftDate(viewDate, { year: 16 });
    }
  }

  const res = Object.assign({}, state, {
    formattedMonths: formattedMonths,
    monthsCalendar: monthsCalendar,
    yearsCalendarModel: yearsCalendarModel
  });
  return res;
}

function flagReducer(state: BsDatepickerState): BsDatepickerState {
  if (!state.view) {
    return state;
  }
  const displayMonths = isDisplayOneMonth(state.view.date, state.minDate, state.maxDate) ? 1 : state.displayMonths;
  const flaggedMonths: DaysCalendarViewModel[] = new Array(displayMonths);
  const flaggedMonthsCalendar: MonthsCalendarViewModel[] = new Array(displayMonths);
  const yearsCalendarFlagged: YearsCalendarViewModel[] = new Array(displayMonths);

  for(let idx = 0; idx < displayMonths; idx++) {
    const viewState =  (state.viewStates != null && state.viewStates?.length > idx) ? state.viewStates[idx] : state.view;
    const checkedState = viewState.mode;
    if (state.formattedMonths && checkedState === 'day') {
      const formattedMonth = state.formattedMonths[idx];
      flaggedMonths[idx] =
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
          monthIndex: idx,
          unlinkedCalendars: state.unlinkedCalendars,
        });
    }
    if (checkedState === 'month' && state.monthsCalendar) {
      const formattedMonth = state.monthsCalendar[idx];
      flaggedMonthsCalendar[idx] = flagMonthsCalendar(formattedMonth, {
          isDisabled: state.isDisabled,
          minDate: state.minDate,
          maxDate: state.maxDate,
          hoveredMonth: state.hoveredMonth,
          selectedDate: state.selectedDate,
          datesDisabled: state.datesDisabled,
          datesEnabled: state.datesEnabled,
          selectedRange: state.selectedRange,
          displayMonths,
          monthIndex: idx,
          unlinkedCalendars: state.unlinkedCalendars,
        });
    }
    if (checkedState === 'year' && state.yearsCalendarModel) {
      const formattedMonth = state.yearsCalendarModel[idx];
      yearsCalendarFlagged[idx] = flagYearsCalendar(formattedMonth, {
        isDisabled: state.isDisabled,
        minDate: state.minDate,
        maxDate: state.maxDate,
        hoveredYear: state.hoveredYear,
        selectedDate: state.selectedDate,
        datesDisabled: state.datesDisabled,
        datesEnabled: state.datesEnabled,
        selectedRange: state.selectedRange,
        displayMonths,
        yearIndex: idx,
        unlinkedCalendars: state.unlinkedCalendars,
      });
    }
  }

  return Object.assign({}, state, { flaggedMonths, flaggedMonthsCalendar, yearsCalendarFlagged });
}

function navigateOffsetReducer(state: BsDatepickerState, action: Action): BsDatepickerState {

  if (!state.view) {
    return state;
  }
  const date = shiftViewDate(state, { ...action, payload: action.payload.step });
  if (!date) {
    return state;
  }
  const source = action.payload.source;
  const newState: {view: BsDatepickerViewState} = {
    view: {
      mode: source != null && state.viewStates != null ? state.viewStates[source].mode : state.view.mode,
      date,
      source,
      direction: action.payload.step['month'] ?? action.payload.step['year'],
    },

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
