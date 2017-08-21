import {
  BsDatepickerState, initialDatepickerState
} from './bs-datepicker.state';
import { Action } from '../../mini-ngrx/index';
import { BsDatepickerActions } from './bs-datepicker.actions';
import { calcDaysCalendar } from '../engine/calc-days-calendar';
import { formatDaysCalendar } from '../engine/format-days-calendar';
import { flagDaysCalendar } from '../engine/flag-days-calendar';
import { shiftDate } from '../../bs-moment/utils/date-setters';
import { canSwitchMode } from '../engine/view-mode';
import { formatMonthsCalendar } from '../engine/format-months-calendar';
import { flagMonthsCalendar } from '../engine/flag-months-calendar';
import {
  formatYearsCalendar, yearsPerCalendar
} from '../engine/format-years-calendar';
import { flagYearsCalendar } from '../engine/flag-years-calendar';

export function bsDatepickerReducer(state = initialDatepickerState, action: Action): BsDatepickerState {
  switch (action.type) {
    case(BsDatepickerActions.CALCULATE): {
      return calculateReducer(state);
    }

    case(BsDatepickerActions.FORMAT): {
      return formatReducer(state, action);
    }

    case(BsDatepickerActions.FLAG): {
      return flagReducer(state, action);
    }

    case(BsDatepickerActions.NAVIGATE_OFFSET): {
      const viewDate = shiftDate(state.viewDate, action.payload);
      return Object.assign({}, state, {viewDate});
    }

    case(BsDatepickerActions.NAVIGATE_TO): {
      return state;
    }

    case(BsDatepickerActions.CHANGE_VIEWMODE): {
      if (!canSwitchMode(action.payload)) {
        return state;
      }
      const viewMode = action.payload;

      return Object.assign({}, state, {viewMode});
    }

    case(BsDatepickerActions.HOVER): {
      return Object.assign({}, state, {hoveredDate: action.payload});
    }

    case(BsDatepickerActions.SELECT): {
      return Object.assign({}, state, {selectedDate: action.payload});
    }

    case(BsDatepickerActions.RENDER_OPTIONS): {
      return Object.assign({}, state, {renderOptions: action.payload});
    }

    // date range picker
    case(BsDatepickerActions.SELECT_RANGE): {
      return Object.assign({}, state, {selectedRange: action.payload});
    }

    default:
      return state;
  }
}

function calculateReducer(state: BsDatepickerState): BsDatepickerState {
  // how many calendars
  const displayMonths = state.renderOptions.displayMonths;
  // check initial rendering
  const isInitialRendering = !!state.monthsModel;
  // use selected date on initial rendering if set
  let viewDate = isInitialRendering && state.selectedDate || state.viewDate;

  if (state.viewMode === 'day') {
    const monthsModel = new Array(displayMonths);
    for (let monthIndex = 0; monthIndex < displayMonths; monthIndex++) {
      // todo: for unlinked calendars it will be harder
      monthsModel[monthIndex] = calcDaysCalendar(viewDate, state.monthViewOptions);
      viewDate = shiftDate(viewDate, {month: 1});
    }

    return Object.assign({}, state, {monthsModel});
  }

  if (state.viewMode === 'month') {
    const monthsCalendar = new Array(displayMonths);
    for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
      // todo: for unlinked calendars it will be harder
      monthsCalendar[calendarIndex] = formatMonthsCalendar(viewDate, state.formatOptions);
      viewDate = shiftDate(viewDate, {year: 1});
    }

    return Object.assign({}, state, {monthsCalendar});
  }

  if (state.viewMode === 'year') {
    const yearsCalendarModel = new Array(displayMonths);

    for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
      // todo: for unlinked calendars it will be harder
      yearsCalendarModel[calendarIndex] = formatYearsCalendar(viewDate, state.formatOptions);
      viewDate = shiftDate(viewDate, {year: yearsPerCalendar});
    }

    return Object.assign({}, state, {yearsCalendarModel});
  }

  return state;
}

function formatReducer(state: BsDatepickerState, action: Action): BsDatepickerState {
  if (state.viewMode === 'day') {
    const formattedMonths = state.monthsModel
      .map((month, monthIndex) => formatDaysCalendar(month, state.formatOptions, monthIndex));

    return Object.assign({}, state, {formattedMonths});
  }

  // how many calendars
  const displayMonths = state.renderOptions.displayMonths;
  // check initial rendering
  const isInitialRendering = !!state.monthsModel;
  // use selected date on initial rendering if set
  let viewDate = isInitialRendering && state.selectedDate || state.viewDate;

  if (state.viewMode === 'month') {
    const monthsCalendar = new Array(displayMonths);
    for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
      // todo: for unlinked calendars it will be harder
      monthsCalendar[calendarIndex] = formatMonthsCalendar(viewDate, state.formatOptions);
      viewDate = shiftDate(viewDate, {year: 1});
    }

    return Object.assign({}, state, {monthsCalendar});
  }

  if (state.viewMode === 'year') {
    const yearsCalendarModel = new Array(displayMonths);
    for (let calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
      // todo: for unlinked calendars it will be harder
      yearsCalendarModel[calendarIndex] = formatYearsCalendar(viewDate, state.formatOptions);
      viewDate = shiftDate(viewDate, {year: 16});
    }

    return Object.assign({}, state, {yearsCalendarModel});
  }

  return state;
}

function flagReducer(state: BsDatepickerState, action: Action): BsDatepickerState {
  if (state.viewMode === 'day') {
    const flaggedMonths = state.formattedMonths
      .map((formattedMonth, monthIndex) => flagDaysCalendar(formattedMonth, {
        hoveredDate: state.hoveredDate,
        selectedDate: state.selectedDate,
        selectedRange: state.selectedRange,
        displayMonths: state.renderOptions.displayMonths,
        monthIndex
      }));

    return Object.assign({}, state, {flaggedMonths});
  }

  if (state.viewMode === 'month') {
    const flaggedMonthsCalendar = state.monthsCalendar
      .map((formattedMonth, monthIndex) => flagMonthsCalendar(formattedMonth, {
        hoveredMonth: state.hoveredMonth,
        displayMonths: state.renderOptions.displayMonths,
        monthIndex
      }));

    return Object.assign({}, state, {flaggedMonthsCalendar});
  }

  if (state.viewMode === 'year') {
    const yearsCalendarFlagged = state.yearsCalendarModel
      .map((formattedMonth, yearIndex) => flagYearsCalendar(formattedMonth, {
        hoveredYear: state.hoveredYear,
        displayMonths: state.renderOptions.displayMonths,
        yearIndex
      }));

    return Object.assign({}, state, {yearsCalendarFlagged});
  }

  return state;
}

