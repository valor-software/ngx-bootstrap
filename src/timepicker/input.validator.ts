import { AbstractControl, ValidationErrors } from '@angular/forms';
import {
  isHourInputValid,
  isInRange,
  isMinuteInputValid,
  isSecondInputValid
} from './timepicker.utils';


export function hoursValidator({ value }: AbstractControl): ValidationErrors | null {
  if (value.hours && !isHourInputValid(value.hours)) {
    return { hours : true };
  }

  return null;
}

export function minutesValidator({ value }: AbstractControl): ValidationErrors | null {
  if (value.minutes && !isMinuteInputValid(value.minutes)) {
    return { minutes : true };
  }

  return null;
}

export function secondsValidator({ value }: AbstractControl): ValidationErrors | null {
  if (value.seconds && !isSecondInputValid(value.seconds)) {
    return { seconds : true };
  }

  return null;
}

export function limitsValidator({ value }: AbstractControl): ValidationErrors | null {
  if (!value.range) {

    return null;
  }

  const time: Date = new Date();

  time.setHours(value.hours);
  time.setMinutes(value.minutes);
  time.setSeconds(value.seconds);

  if (isInRange(time, value.range.max, value.range.min)) {

    return null;
  }

  return {
    hours: { inputLimit: true },
    minutes: { inputLimit: true },
    seconds: { inputLimit: true }
  };
}
