import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  isHourInputValid,
  isInputLimitValid,
  isMinuteInputValid,
  isSecondInputValid
} from './timepicker.utils';


export function getHoursValidator(): ValidatorFn {
  return ({ value }: AbstractControl): ValidationErrors | null => {
    if (!isHourInputValid(value)) {
      return { hours : true };
    }

    return null;
  };
}

export function getMinutesValidator(): ValidatorFn {
  return ({ value }: AbstractControl): ValidationErrors | null => {
    if (!isMinuteInputValid(value)) {
      return { minutes : true };
    }

    return null;
  };
}

export function getSecondsValidator(): ValidatorFn {
  return ({ value }: AbstractControl): ValidationErrors | null => {
    if (!isSecondInputValid(value)) {
      return { seconds : true };
    }

    return null;
  };
}

export function getLimitsValidator(min: Date, max: Date): ValidatorFn {
  return ({ value }: AbstractControl): ValidationErrors | null => {

    if (isInputLimitValid({
      hour: value.hours,
      minute: value.minutes,
      seconds: value.seconds
    }, max, min)) {

      return null;
    }

    return { inputLimit: true };
  };
}
