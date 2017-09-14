// tslint:disable:max-file-line-count
import {
  BsDatepickerState,
  initialDatepickerState
} from './bs-datepicker.state';
import { Action } from '../../mini-ngrx/index';
import { BsDatepickerActions } from './bs-datepicker.actions';
import { calcDaysCalendar } from '../engine/calc-days-calendar';
import { formatDaysCalendar } from '../engine/format-days-calendar';
import { flagDaysCalendar } from '../engine/flag-days-calendar';
import { shiftDate, setDate } from '../../bs-moment/utils/date-setters';
import { canSwitchMode } from '../engine/view-mode';
import { formatMonthsCalendar } from '../engine/format-months-calendar';
import { flagMonthsCalendar } from '../engine/flag-months-calendar';
import {
  formatYearsCalendar,
  yearsPerCalendar
} from '../engine/format-years-calendar';
import { flagYearsCalendar } from '../engine/flag-years-calendar';
import {
  BsViewNavigationEvent,
  DatepickerFormatOptions
} from '../models/index';
import { isArray } from '../../bs-moment/utils/type-checks';
import { startOf } from '../../bs-moment/utils/start-end-of';

export function bsDatepickerReducer(
  state = initialDatepickerState,
  action: Action
): BsDatepickerState {
  switch (action.type) {
    case BsDatepickerActions.CALCULATE: {
      return calculateReducer(state);
    }

    case BsDatepickerActions.FORMAT: {
      return formatReducer(state, action);
    }

    case BsDatepickerActions.FLAG: {
      return flagReducer(state, action);
    }

    case BsDatepickerActions.NAVIGATE_OFFSET: {
      const date = shiftDate(startOf(state.view.date, 'month'), action.payload);
      const newState = {
        view: {
          mode: state.view.mode,
          date
        }
      };

      return Object.assign({}, state, newState);
    }

    case BsDatepickerActions.NAVIGATE_TO: {
      const payload: BsViewNavigationEvent = action.payload;

      const date = setDate(state.view.date, payload.unit);
      const mode = payload.viewMode;
      const newState = { view: { date, mode } };

      return Object.assign({}, state, newState);
    }

    case BsDatepickerActions.CHANGE_VIEWMODE: {
      if (!canSwitchMode(action.payload)) {
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
      const newState = {
        selectedDate: action.payload,
        view: state.view
      };

      if (action.payload) {
        newState.view = {
          date: action.payload,
          mode: state.view.mode
        };
      }

      return Object.assign({}, state, newState);
    }

    case BsDatepickerActions.SET_OPTIONS: {
      const newState = action.payload;
      // looks not really good
      if (newState.value) {
        newState.view = state.view;
        if (isArray(newState.value)) {
          newState.view = {
            mode: state.view.mode,
            date: newState.value[0]
          };
          newState.selectedRange = newState.value;
        } else {
          newState.view = {
            mode: state.view.mode,
            date: newState.value
          };
          newState.selectedDate = newState.value;
        }
      }

      return Object.assign({}, state, newState);
    }

    // date range picker
    case BsDatepickerActions.SELECT_RANGE: {
      return Object.assign({}, state, { selectedRange: action.payload });
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

    default:
      return state;
  }
}

function calculateReducer(state: BsDatepickerState): BsDatepickerState {
  // how many calendars
  const displayMonths = state.displayMonths;
  // use selected date on initial rendering if set
  let viewDate = state.view.date;

  if (state.view.mode === 'day') {
    const monthsModel = new Array(displayMonths);
    for (let monthIndex = 0; monthIndex < displayMonths; monthIndex++) {
      // todo: for unlinked calendars it will be harder
      monthsModel[monthIndex] = calcDaysCalendar(
        viewDate,
        state.monthViewOptions
      );
      viewDate = shiftDate(viewDate, { month: 1 });
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
        getFormatOptions(state)
      );
      viewDate = shiftDate(viewDate, { year: yearsPerCalendar });
    }

    return Object.assign({}, state, { yearsCalendarModel });
  }

  return state;
}

function formatReducer(
  state: BsDatepickerState,
  action: Action
): BsDatepickerState {
  if (state.view.mode === 'day') {
    const formattedMonths = state.monthsModel.map((month, monthIndex) =>
      formatDaysCalendar(month, getFormatOptions(state), monthIndex)
    );

    return Object.assign({}, state, { formattedMonths });
  }

  // how many calendars
  const displayMonths = state.displayMonths;
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

function flagReducer(
  state: BsDatepickerState,
  action: Action
): BsDatepickerState {
  if (state.view.mode === 'day') {
    const flaggedMonths = state.formattedMonths.map(
      (formattedMonth, monthIndex) =>
        flagDaysCalendar(formattedMonth, {
          isDisabled: state.isDisabled,
          minDate: state.minDate,
          maxDate: state.maxDate,
          hoveredDate: state.hoveredDate,
          selectedDate: state.selectedDate,
          selectedRange: state.selectedRange,
          displayMonths: state.displayMonths,
          monthIndex
        })
    );

    return Object.assign({}, state, { flaggedMonths });
  }

  if (state.view.mode === 'month') {
    const flaggedMonthsCalendar = state.monthsCalendar.map(
      (formattedMonth, monthIndex) =>
        flagMonthsCalendar(formattedMonth, {
          isDisabled: state.isDisabled,
          minDate: state.minDate,
          maxDate: state.maxDate,
          hoveredMonth: state.hoveredMonth,
          displayMonths: state.displayMonths,
          monthIndex
        })
    );

    return Object.assign({}, state, { flaggedMonthsCalendar });
  }

  if (state.view.mode === 'year') {
    const yearsCalendarFlagged = state.yearsCalendarModel.map(
      (formattedMonth, yearIndex) =>
        flagYearsCalendar(formattedMonth, {
          isDisabled: state.isDisabled,
          minDate: state.minDate,
          maxDate: state.maxDate,
          hoveredYear: state.hoveredYear,
          displayMonths: state.displayMonths,
          yearIndex
        })
    );

    return Object.assign({}, state, { yearsCalendarFlagged });
  }

  return state;
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
