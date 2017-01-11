import { Injectable } from '@angular/core';

/** Provides default configuration values for timepicker */
@Injectable()
export class TimepickerConfig {
  /** hours change step */
  public hourStep: number = 1;
  /** hours change step */
  public minuteStep: number = 5;
  /** if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM */
  public showMeridian: boolean = true;
  /** meridian labels based on locale */
  public meridians:string[] = ['AM', 'PM'];
  /** if true hours and minutes fields will be readonly */
  public readonlyInput: boolean = false;
  /** if true scroll inside hours and minutes inputs will change time */
  public mousewheel: boolean = true;
  /** if true up/down arrowkeys inside hours and minutes inputs will change time */
  public arrowkeys: boolean = true;
  /** if true spinner arrows above and below the inputs will be shown */
  public showSpinners: boolean = true;
  /** minimum time user can select */
  public min: number = void 0;
  /** maximum time user can select */
  public max: number = void 0;
}
