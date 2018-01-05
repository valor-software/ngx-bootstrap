import {
  canChangeHours,
  canChangeMinutes,
  canChangeSeconds,
  canChangeValue,
  getControlsValue,
  timepickerControls
} from '../../timepicker/timepicker-controls.util';
import { TimeChangeEvent, TimepickerComponentState, TimepickerControls } from '../../timepicker/timepicker.models';

function testTime(hours?: number, minutes?: number, seconds?: number) {
  const time = new Date();
  time.setHours(hours || 0);
  time.setMinutes(minutes || 0);
  time.setSeconds(seconds || 0);
  return time;
}

describe('Runtime coverage. Util: Timepicker-controls', () => {
  let state: TimepickerComponentState;
  let controls: TimepickerControls;
  let event: TimeChangeEvent;

  beforeEach(() => {
    state = {
      min: null,
      max: null,
      hourStep: 1,
      minuteStep: 5,
      secondsStep: 10,
      readonlyInput: false,
      mousewheel: true,
      arrowkeys: true,
      showSpinners: true,
      showMeridian: true,
      showSeconds: false,
      meridians: ['AM', 'PM']
    };

    controls = {
      canIncrementHours: false,
      canIncrementMinutes: false,
      canIncrementSeconds: false,
      canDecrementHours: false,
      canDecrementMinutes: false,
      canDecrementSeconds: false
    };

    event = {
      step: 1,
      source: ''
    };
  });

  it('should can change value read only', () => {
    canChangeValue(state, event);

    state.readonlyInput = true;
    canChangeValue(state, event);
  });

  it('should can change value event', () => {
    canChangeValue(state);
    canChangeValue(state, event);
  });

  it('should can change value event source and wheel', () => {
    event.source = 'wheel';
    state.mousewheel = false;

    canChangeValue(state, event);
  });

  it('should can change value event source and key', () => {
    event.source = 'key';
    state.arrowkeys = false;

    canChangeValue(state, event);
  });

  it('should change Hours', () => {
    canChangeHours(event, controls);
  });

  it('should change Hours no step', () => {
    event.step = null;
    canChangeHours(event, controls);
  });

  it('should change Hours step is -1', () => {
    event.step = -1;
    canChangeHours(event, controls);
  });

  it('should change Hours can increment', () => {
    controls.canIncrementHours = true;
    canChangeHours(event, controls);
  });

  it('should change Minutes', () => {
    canChangeMinutes(event, controls);
  });

  it('should change Minutes no step', () => {
    event.step = null;
    canChangeMinutes(event, controls);
  });

  it('should change Minutes step is -1', () => {
    event.step = -1;
    canChangeMinutes(event, controls);
  });

  it('should change Minutes can increment', () => {
    controls.canIncrementMinutes = true;
    canChangeMinutes(event, controls);
  });

  it('should change Seconds', () => {
    canChangeSeconds(event, controls);
  });

  it('should change Seconds no step', () => {
    event.step = null;
    canChangeSeconds(event, controls);
  });

  it('should change Seconds step is -1', () => {
    event.step = -1;
    canChangeSeconds(event, controls);
  });

  it('should change Seconds can increment', () => {
    controls.canIncrementSeconds = true;
    canChangeSeconds(event, controls);
  });

  it('should get controls value', () => {
    getControlsValue(state);
  });

  it('should set data in timepicker controls', () => {
    timepickerControls(new Date(), state);
  });

  it('should set data in timepicker controls without date', () => {
    // unreachable code
  });

  it('should set data in timepicker controls without showSeconds', () => {
    state.showSeconds = true;
    timepickerControls(new Date(), state);
  });

  it('should set data in timepicker controls with max', () => {
    state.max = new Date();
    timepickerControls(new Date(), state);
  });

  it('should set data in timepicker controls with max greater to control time', () => {
    state.max = testTime(1);
    timepickerControls(testTime(), state);
  });

  it('should set data in timepicker controls with min', () => {
    state.min = new Date();
    timepickerControls(new Date(), state);
  });

  it('should set data in timepicker controls with min greater to control time', () => {
    state.min = testTime(1);
    timepickerControls(testTime(), state);
  });
});
