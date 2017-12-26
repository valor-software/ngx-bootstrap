import { bsDatepickerReducer } from '../../datepicker/reducer/bs-datepicker.reducer';
import { BsDatepickerActions } from '../../datepicker/reducer/bs-datepicker.actions';
import { Action } from '../../mini-ngrx/index';
import { initialDatepickerState } from '../../datepicker/reducer/bs-datepicker.state';

describe('BsDatepickerReducer.', () => {

  it('navigateTo : "month" view mode', () => {
    let state = initialDatepickerState;
    let action: Action = {
        type: BsDatepickerActions.NAVIGATE_TO,
        payload:{unit:{year:2017, month:11}, viewMode: 'month'}
    };
    let reducer = bsDatepickerReducer(state, action);
    expect(reducer.view.mode).toEqual('month');
    expect(reducer.view.mode).toEqual('month');
  });

  it('navigateTo : month selection with "month" minMode', () => {
    let state = Object.assign({}, initialDatepickerState, {minMode:'month'});
    initialDatepickerState.view.mode = 'month';
    initialDatepickerState.view.date = new Date(2017,11,1);
    let action : Action = {
        type: BsDatepickerActions.NAVIGATE_TO,
        payload:{unit:{year:2017, month:11, day:1}, viewMode: 'day'}
    };
    let reducer = bsDatepickerReducer(state, action);
    expect(reducer.view.mode).toEqual('month');
    expect(reducer.selectedDate).toEqual(new Date(2017,11,1));
  });

});
