import { bsDatepickerReducer } from '../reducer/bs-datepicker.reducer';
import { BsDatepickerActions } from '../reducer/bs-datepicker.actions';
import { Action } from 'ngx-bootstrap/mini-ngrx';
import { initialDatepickerState } from '../reducer/bs-datepicker.state';
import { mockFlaggedMonths } from './flaggedMonthsMock';

describe('BsDatepickerReducer.', () => {
  it('navigateTo : "month" view mode', () => {
    const state = initialDatepickerState;
    const action: Action = {
        type: BsDatepickerActions.NAVIGATE_TO,
        payload: { unit: { year: 2017, month: 11 }, viewMode: 'month'}
    };
    const reducer = bsDatepickerReducer(state, action);
    expect(reducer.view.mode).toEqual('month');
    expect(reducer.view.mode).toEqual('month');
  });

  it('navigateTo : month selection with "month" minMode', () => {
    const state = Object.assign({}, initialDatepickerState, { minMode: 'month' });

    initialDatepickerState.view.mode = 'month';
    initialDatepickerState.view.date = new Date(2017, 11, 1);

    const action: Action = {
      type: BsDatepickerActions.NAVIGATE_TO,
      payload: { unit: { year: 2017, month: 11, day: 1}, viewMode: 'day' }
    };

    const reducer = bsDatepickerReducer(state, action);
    expect(reducer.view.mode).toEqual('month');
    expect(reducer.selectedDate).toEqual(new Date(2017, 11, 1));
  });

  it('preventChangeToNextMonth : months shouldn\'t change', () => {
    const state = Object.assign({}, initialDatepickerState, {
      preventChangeToNextMonth: true,
      displayMonths: 2,
      hoveredDate: true,
      flaggedMonths: mockFlaggedMonths
    });

    initialDatepickerState.view.mode = 'day';
    initialDatepickerState.view.date = new Date('2021-04-14T12:36:16');

    const action: Action = {
      type: BsDatepickerActions.CALCULATE,
      payload: {}
    };

    const reducer = bsDatepickerReducer(state, action);
    expect(reducer.view.mode).toEqual('day');
    expect(reducer.monthsModel.pop().month).toEqual(state.flaggedMonths[1].month);
  });

  it('preventChangeToNextMonth : months should change', () => {
    const state = Object.assign({}, initialDatepickerState, {
      preventChangeToNextMonth: false,
      displayMonths: 2,
      hoveredDate: true,
      flaggedMonths: mockFlaggedMonths
    });

    initialDatepickerState.view.mode = 'day';
    initialDatepickerState.view.date = new Date('2021-04-14T12:36:16');

    const action: Action = {
      type: BsDatepickerActions.CALCULATE,
      payload: {}
    };

    const reducer = bsDatepickerReducer(state, action);
    expect(reducer.view.mode).toEqual('day');
    expect((reducer.monthsModel.pop().month.toISOString() === state.flaggedMonths[1].month.toISOString())).toBeFalsy();
  });
});
