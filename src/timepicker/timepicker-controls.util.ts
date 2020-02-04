import { changeTime, getOffsetHours, getOffsetMinutes } from './timepicker.utils';
import { TimepickerOffsetTarget } from './timepicker.config';
import {
  TimeChangeEvent,
  TimepickerComponentState,
  TimepickerControls
} from './timepicker.models';

export function canChangeValue(
  state: TimepickerComponentState,
  event?: TimeChangeEvent
): boolean {
  if (state.readonlyInput || state.disabled) {
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

export function canChangeHours(
  event: TimeChangeEvent,
  controls: TimepickerControls
): boolean {
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

export function canChangeMinutes(
  event: TimeChangeEvent,
  controls: TimepickerControls
): boolean {
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

export function canChangeSeconds(
  event: TimeChangeEvent,
  controls: TimepickerControls
): boolean {
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

export function getControlsValue(
  state: TimepickerComponentState
): TimepickerComponentState {
  const {
    hourStep,
    minuteStep,
    secondsStep,
    readonlyInput,
    disabled,
    mousewheel,
    arrowkeys,
    showSpinners,
    showMeridian,
    showSeconds,
    meridians,
    min,
    max,
    offset,
    offsetTarget
  } = state;

  return {
    hourStep,
    minuteStep,
    secondsStep,
    readonlyInput,
    disabled,
    mousewheel,
    arrowkeys,
    showSpinners,
    showMeridian,
    showSeconds,
    meridians,
    min,
    max,
    offset,
    offsetTarget
  };
}

export function timepickerControls(
  value: Date,
  state: TimepickerComponentState
): TimepickerControls {
  const hoursPerDayHalf = 12;
  const { min, max, hourStep, minuteStep, secondsStep, showSeconds, offset, offsetTarget } = state;
  const res: TimepickerControls = {
    canIncrementHours: true,
    canIncrementMinutes: true,
    canIncrementSeconds: true,

    canDecrementHours: true,
    canDecrementMinutes: true,
    canDecrementSeconds: true,

    canToggleMeridian: true
  };

  if (!value) {
    return res;
  }

  // compare dates
  if (max) {
    const _newHour = changeTime(value, { hour: hourStep });

    res.canIncrementHours = max > _newHour;
    if (offset) {
      res.canIncrementHours = canIncrementHoursWithOffset(offset, offsetTarget, max, _newHour);
    }

    if (!res.canIncrementHours) {
      const _newMinutes = changeTime(value, { minute: minuteStep });
      res.canIncrementMinutes = showSeconds
        ? max > _newMinutes
        : max >= _newMinutes;

      if (offset) {
        res.canIncrementMinutes = canIncrementMinutesWithOffset(offset, offsetTarget, max, _newHour, showSeconds);
      }
    }

    if (!res.canIncrementMinutes) {
      const _newSeconds = changeTime(value, { seconds: secondsStep });
      res.canIncrementSeconds = max >= _newSeconds;
    }

    if (value.getHours() < hoursPerDayHalf) {
      res.canToggleMeridian = changeTime(value, { hour: hoursPerDayHalf }) < max;
    }
  }

  if (min) {
    const _newHour = changeTime(value, { hour: -hourStep });
    res.canDecrementHours = min < _newHour;

    if (!res.canDecrementHours) {
      const _newMinutes = changeTime(value, { minute: -minuteStep });
      res.canDecrementMinutes = showSeconds
        ? min < _newMinutes
        : min <= _newMinutes;
    }

    if (!res.canDecrementMinutes) {
      const _newSeconds = changeTime(value, { seconds: -secondsStep });
      res.canDecrementSeconds = min <= _newSeconds;
    }

    if (value.getHours() >= hoursPerDayHalf) {
      res.canToggleMeridian = changeTime(value, { hour: -hoursPerDayHalf }) > min;
    }
  }

  return res;
}


function canIncrementHoursWithOffset(offset: number, target: TimepickerOffsetTarget, max: Date, newTime: Date) {
  if (target === TimepickerOffsetTarget.UTC) {
    return offset < 0
    ? (max.getUTCHours() - getOffsetHours(offset)) > (newTime.getUTCHours())
    : (max.getUTCHours() + getOffsetHours(offset)) > (newTime.getUTCHours());
  }

  return offset < 0
  ? (max.getHours() - getOffsetHours(offset)) > (newTime.getHours())
  : (max.getHours() + getOffsetHours(offset)) > (newTime.getHours());
}

function canIncrementMinutesWithOffset(
  offset: number,
  target: TimepickerOffsetTarget,
  max: Date,
  newTime: Date,
  showSeconds: boolean
  ) {
  if (target === TimepickerOffsetTarget.UTC) {
    return showSeconds
    ? (offset < 0
      ? (max.getMinutes() - getOffsetMinutes(offset)) > newTime.getUTCMinutes()
      : (max.getMinutes() + getOffsetMinutes(offset)) > newTime.getUTCMinutes())
    : (offset < 0
      ? (max.getMinutes() - getOffsetMinutes(offset)) >= newTime.getUTCMinutes()
      : (max.getMinutes() + getOffsetMinutes(offset)) >= newTime.getUTCMinutes());
  }

  return showSeconds
  ? (offset < 0
    ? (max.getMinutes() - getOffsetMinutes(offset)) > newTime.getMinutes()
    : (max.getMinutes() + getOffsetMinutes(offset)) > newTime.getMinutes())
  : (offset < 0
    ? (max.getMinutes() - getOffsetMinutes(offset)) >= newTime.getMinutes()
    : (max.getMinutes() + getOffsetMinutes(offset)) >= newTime.getMinutes());
}
