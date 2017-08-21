import { BsDatepickerState, initialDatepickerState } from './bs-datepicker.state';
import { Action } from '../../mini-ngrx/index';
import { BsDatepickerActions } from './bs-datepicker.actions';
import { calculateMonthModel } from '../engine/calc-month-view';
import { formatMonthView } from '../engine/format-month-view';
import { changeDate } from '../utils/date-utils';
import { flagMonthView } from '../engine/flag-month-view';

export function bsDatepickerReducer(state = initialDatepickerState, action: Action): BsDatepickerState {
  switch (action.type) {
/*
    case (BsDatepickerActions.INIT): {
      const locale = getLocale(state.formatOptions.locale);
      const monthViewOptions = Object.assign({}, state.monthViewOptions, {firstDayOfWeek: locale.firstDayOfWeek()});
      const monthModel = calculateMonthModel(state.viewDate, monthViewOptions);
      return Object.assign({}, state, {locale, monthViewOptions, monthModel});
    }
*/

    case (BsDatepickerActions.CALCULATE): {
      const displayMonths = state.renderOptions.displayMonths;
      const monthsModel = new Array(displayMonths);
      let viewDate = state.viewDate;

      for (let monthIndex = 0; monthIndex < displayMonths; monthIndex++) {
        // todo: for unlinked calendars it will be harder
         monthsModel[monthIndex] = calculateMonthModel(viewDate, state.monthViewOptions);
         viewDate = changeDate(viewDate, {month: 1});
      }
      return Object.assign({}, state, {monthsModel});
    }

    case (BsDatepickerActions.FORMAT): {
      const formattedMonths = state.monthsModel
        .map((month, monthIndex) => formatMonthView(month, state.formatOptions, monthIndex));
      return Object.assign({}, state, {formattedMonths});
    }

    case (BsDatepickerActions.FLAG): {
      const flaggedMonths = state.formattedMonths
        .map((formattedMonth, monthIndex) => flagMonthView(formattedMonth, {
          hoveredDate: state.hoveredDate,
          selectedDate: state.selectedDate,
          selectedRange: state.selectedRange,
          displayMonths: state.renderOptions.displayMonths,
          monthIndex
        }));
      return Object.assign({}, state, {flaggedMonths});
    }

    case(BsDatepickerActions.STEP_NAVIGATION): {
      const viewDate = changeDate(state.viewDate, action.payload);
      return Object.assign({}, state, {viewDate});
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

    default: return state;
  }
}
