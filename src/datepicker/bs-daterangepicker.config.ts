import { Injectable } from '@angular/core';
import { BsDatepickerConfig } from './bs-datepicker.config';

@Injectable({
  providedIn: 'root'
})
export class BsDaterangepickerConfig extends BsDatepickerConfig {
  // DatepickerRenderOptions
  displayMonths = 2;
}
