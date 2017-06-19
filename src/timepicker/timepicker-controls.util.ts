import { setTime } from './timepicker.utils';
import { TimeChangeEvent, TimepickerComponentState, TimepickerControls } from './timepicker.models';

export function canChangeValue(state: TimepickerComponentState, event?: TimeChangeEvent): boolean {
  if (state.readonlyInput) {
    return false;
  }

  if (event) {
    if (event.source === 'wheel' && !state.mousewheel) {
      return false;
    }

    if (event.source === 'key' && !state.arrowkeys) {
      return false;
    }
  }

  return true;
}

export function canChangeHours(event: TimeChangeEvent, controls: TimepickerControls): boolean {
  if (!event.step) {
    return false;
  }

  if (event.step > 0 && !controls.canIncrementHours) {
    return false;
  }

  if (event.step < 0 && !controls.canDecrementHours) {
    return false;
  }

  return true;
}

export function canChangeMinutes(event: TimeChangeEvent, controls: TimepickerControls): boolean {
  if (!event.step) {
    return false;
  }
  if (event.step > 0 && !controls.canIncrementMinutes) {
    return false;
  }
  if (event.step < 0 && !controls.canDecrementMinutes) {
    return false;
  }

  return true;
}

export function canChangeSeconds(event: TimeChangeEvent, controls: TimepickerControls): boolean {
  if (!event.step) {
    return false;
  }
  if (event.step > 0 && !controls.canIncrementSeconds) {
    return false;
  }
  if (event.step < 0 && !controls.canDecrementSeconds) {
    return false;
  }

  return true;
}

export function getControlsValue(state: TimepickerComponentState): TimepickerComponentState {
  const {
    hourStep, minuteStep, secondsStep,
    readonlyInput, mousewheel, arrowkeys,
    showSpinners, showMeridian, showSeconds,
    meridians, min, max
  } = state;
  return {
    hourStep, minuteStep, secondsStep,
    readonlyInput, mousewheel, arrowkeys,
    showSpinners, showMeridian, showSeconds,
    meridians, min, max
  };
}

export function timepickerControls(value: Date, state: TimepickerComponentState): TimepickerControls {
  const {min, max, hourStep, minuteStep, secondsStep, showSeconds} = state;
  const res = {
    canIncrementHours: true,
    canIncrementMinutes: true,
    canIncrementSeconds: true,

    canDecrementHours: true,
    canDecrementMinutes: true,
    canDecrementSeconds: true
  } as TimepickerControls;

  if (!value) {
    return res;
  }

  const hour = value.getHours();
  const minute = value.getMinutes();
  const seconds = showSeconds ? value.getSeconds() : 0;

// compare dates
  if (max) {
    const _newHour = setTime(max, {
      hour: hour + hourStep,
      minute, seconds
    });
    res.canIncrementHours = max >= _newHour;

    if (!res.canIncrementHours) {
      const _newMinutes = setTime(max, {
        hour,
        minute: minute + minuteStep,
        seconds
      });
      res.canIncrementMinutes = max >= _newMinutes;
    }

    if (!res.canIncrementMinutes) {
      const _newSeconds = setTime(max, {
        hour,
        minute,
        seconds: seconds + secondsStep
      });

      res.canIncrementSeconds = max >= _newSeconds;
    }
  }

  if (min) {
    const _newHour = setTime(min, {
      hour: hour - hourStep,
      minute, seconds
    });
    // res.canIncrementHours = min.getHours() >= (value.getHours() + hourStep);
    res.canDecrementHours = min <= _newHour;

    if (!res.canDecrementHours) {
      const _newMinutes = setTime(min, {
        hour,
        minute: minute - minuteStep,
        seconds
      });
      // res.canDecrementMinutes = min.getMinutes() <= (value.getMinutes() + minuteStep);
      res.canDecrementMinutes = min <= _newMinutes;
    }

    if (!res.canDecrementMinutes) {
      const _newSeconds = setTime(min, {
        hour,
        minute,
        seconds: seconds - secondsStep
      });

      res.canDecrementSeconds = min <= _newSeconds;
    }
  }

  return res;
}
