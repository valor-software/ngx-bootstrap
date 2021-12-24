import { Injectable } from '@angular/core';
import { BsDatepickerConfig } from './bs-datepicker.config';

@Injectable({
  providedIn: 'root'
})
export class BsDaterangepickerConfig extends BsDatepickerConfig {
  // DatepickerRenderOptions
  override displayMonths = 2;
}
