import { Injectable } from '@angular/core';
import { BsDatepickerConfig } from './bs-datepicker.config';

@Injectable()
export class BsDaterangepickerConfig extends BsDatepickerConfig {
  // DatepickerRenderOptions
  displayMonths = 2;
  /** turn on/off animation */
  isAnimated = false;
}
