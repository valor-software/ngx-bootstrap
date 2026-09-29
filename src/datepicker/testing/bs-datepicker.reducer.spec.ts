import { bsDatepickerReducer } from '../reducer/bs-datepicker.reducer';
import { BsDatepickerActions } from '../reducer/bs-datepicker.actions';
import { Action } from 'ngx-bootstrap/mini-ngrx';
import { BsDatepickerState, initialDatepickerState } from '../reducer/bs-datepicker.state';
import { BsDatepickerViewMode } from '../models';
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

  it('selectedTime: the second selectedTime should be updated ', () => {
    const state = initialDatepickerState;
    const action: Action = {
      type: BsDatepickerActions.SELECT_TIME,
      payload: { date: new Date(1630298176000), index: 1 }
    };
    const reducer = bsDatepickerReducer(state, action);
    expect(reducer.selectedTime.length).toEqual(2);
    expect(reducer.selectedTime[1].getTime()).toEqual(1630298176000);
  });

  describe('datesDisabled in month and year views', () => {
    function disabledCells(mode: BsDatepickerViewMode, extra: Partial<BsDatepickerState>): string[] {
      let state: BsDatepickerState = Object.assign({}, initialDatepickerState, extra, {
        view: { date: new Date(2023, 4, 15), mode }
      });
      [BsDatepickerActions.CALCULATE, BsDatepickerActions.FORMAT, BsDatepickerActions.FLAG]
        .forEach(type => state = bsDatepickerReducer(state, { type }));

      const cells = mode === 'month'
        ? state.flaggedMonthsCalendar?.[0].months
        : state.yearsCalendarFlagged?.[0].years;

      return (cells || []).flat().filter(cell => cell.isDisabled).map(cell => cell.label);
    }

    it('should not disable a month when only its first day is disabled and days are selectable', () => {
      expect(disabledCells('month', { datesDisabled: [new Date(2023, 4, 1)] })).toEqual([]);
    });

    it('should disable a month from datesDisabled when minMode is "month"', () => {
      expect(disabledCells('month', { minMode: 'month', datesDisabled: [new Date(2023, 4, 1)] })).toEqual(['May']);
    });

    it('should keep disabling months without enabled dates when days are selectable', () => {
      const disabled = disabledCells('month', { datesEnabled: [new Date(2023, 4, 1), new Date(2023, 4, 20)] });

      expect(disabled.length).toEqual(11);
      expect(disabled).not.toContain('May');
    });

    // year cells are dated on the view date's day of each year, so the disabled date sits on a year cell
    it('should not disable a year when one of its days is disabled and days are selectable', () => {
      expect(disabledCells('year', { datesDisabled: [new Date(2023, 4, 15)] })).toEqual([]);
    });

    it('should not disable a year when one of its months is disabled and minMode is "month"', () => {
      expect(disabledCells('year', { minMode: 'month', datesDisabled: [new Date(2023, 4, 15)] })).toEqual([]);
    });

    it('should disable a year from datesDisabled when minMode is "year"', () => {
      expect(disabledCells('year', { minMode: 'year', datesDisabled: [new Date(2023, 4, 15)] })).toEqual(['2023']);
    });
  });
});
