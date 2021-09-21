import { ValidationErrors } from '@angular/forms';
import {
  isHourInputValid,
  isInRange,
  isMinuteInputValid,
  isSecondInputValid
} from './timepicker.utils';


export function hoursValidator(value: {[key: string]: string}): ValidationErrors | null {
  if (value.hours && !isHourInputValid(value.hours)) {
    return { hours : true };
  }

  return null;
}

export function minutesValidator(value: {[key: string]: string}): ValidationErrors | null {
  if (value.minutes && !isMinuteInputValid(value.minutes)) {
    return { minutes : true };
  }

  return null;
}

export function secondsValidator(value: {[key: string]: string}): ValidationErrors | null {
  if (value.seconds && !isSecondInputValid(value.seconds)) {
    return { seconds : true };
  }

  return null;
}

export function getlimitsValidator(min: Date | undefined, max: Date | undefined, isPM: boolean): Function {
  return (value: {[key: string]: number}): ValidationErrors | null  => {

    const time: Date = new Date();
    const hours = isPM ? (Number(value.hours) + 12) : value.hours;

    time.setHours(hours);
    time.setMinutes(value.minutes);
    time.setSeconds(value.seconds);

    if (!min || !max) {
      return null;
    }

    if (isInRange(time, max, min)) {

      return null;
    }

    return {
      hours: { outOfRange: true },
      minutes: { outOfRange: true },
      seconds: { outOfRange: true }
    };
  };
}

export function compose(validators: Function[]): Function {
  return (timeValue: any): ValidationErrors | null => {

    const newErrors: ValidationErrors[] = validators.map(
      (validator: Function) => validator(timeValue)
    );
    const errors: ValidationErrors = Object.assign({}, ...newErrors);

    if (!Object.keys(errors).length) {

      return null;
    }

    return errors;
  };
}
