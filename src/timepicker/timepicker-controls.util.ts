import { setTime } from './timepicker.utils';
import { TimepickerComponentState, TimepickerControls } from './timepicker.models';

export function timepickerControls(state: TimepickerComponentState): TimepickerControls {
  const {min, max, value, hourStep, minuteStep, secondsStep, showSeconds} = state;
  const res = {} as TimepickerControls;

  if (!min && !max) {
    res.canIncrementHours = true;
    res.canIncrementMinutes = true;
    res.canIncrementSeconds = true;
    res.canDecrementHours = true;
    res.canDecrementMinutes = true;
    res.canDecrementSeconds = true;

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
    // res.canIncrementHours = max.getHours() >= (value.getHours() + hourStep);
    res.canIncrementHours = max >= _newHour;
    if (res.canIncrementHours) {
      res.canIncrementMinutes = true;
      res.canIncrementSeconds = true;
    } else {
      const _newMinutes = setTime(max, {
        hour,
        minute: minute + minuteStep,
        seconds
      });
      // res.canIncrementMinutes = max.getMinutes() >= (value.getMinutes() + minuteStep);
      res.canIncrementMinutes = max >= _newMinutes;
      if (res.canIncrementMinutes) {
        res.canIncrementSeconds = true;
      } else {
        const _newSeconds = setTime(max, {
          hour,
          minute,
          seconds: seconds + secondsStep
        });

        res.canIncrementSeconds = max >= _newSeconds;
      }
    }
  }

  if (min) {
    const _newHour = setTime(min, {
      hour: hour - hourStep,
      minute, seconds
    });
    // res.canIncrementHours = min.getHours() >= (value.getHours() + hourStep);
    res.canDecrementHours = min <= _newHour;
    if (res.canDecrementHours) {
      res.canDecrementMinutes = true;
      res.canDecrementSeconds = true;
    } else {
      const _newMinutes = setTime(min, {
        hour,
        minute: minute - minuteStep,
        seconds
      });
      // res.canDecrementMinutes = min.getMinutes() <= (value.getMinutes() + minuteStep);
      res.canDecrementMinutes = min <= _newMinutes;
      if (res.canDecrementMinutes) {
        res.canDecrementSeconds = true;
      } else {
        const _newSeconds = setTime(min, {
          hour,
          minute,
          seconds: seconds - secondsStep
        });

        res.canDecrementSeconds = min <= _newSeconds;
      }
    }
  }

  return res;
}
