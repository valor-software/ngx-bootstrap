import { Injectable } from '@angular/core';

/** Provides default configuration values for timepicker */
@Injectable()
export class TimepickerConfig {
  /** hours change step */
  hourStep = 1;
  /** hours change step */
  minuteStep = 5;
  /** seconds changes step */
  secondsStep = 10;
  /** if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM */
  showMeridian = true;
  /** meridian labels based on locale */
  meridians = ['AM', 'PM'];
  /** if true hours and minutes fields will be readonly */
  readonlyInput = false;
  /** if true hours and minutes fields will be disabled */
  disabled = false;
  /** if true scroll inside hours and minutes inputs will change time */
  mousewheel = true;
  /** if true up/down arrowkeys inside hours and minutes inputs will change time */
  arrowkeys = true;
  /** if true spinner arrows above and below the inputs will be shown */
  showSpinners = true;
  /** show seconds in timepicker */
  showSeconds = false;
  /** show minutes in timepicker */
  showMinutes = true;
  /** minimum time user can select */
  min: Date;
  /** maximum time user can select */
  max: Date;
}
