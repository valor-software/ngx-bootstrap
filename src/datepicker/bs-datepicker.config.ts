import { Injectable } from '@angular/core';
import { DatepickerFormatOptions, DatepickerRenderOptions } from './models/index';

@Injectable()
export class BsDatepickerConfig implements DatepickerRenderOptions,
  DatepickerFormatOptions {

  value?: Date | Date[];
  minDate?: Date;
  maxDate?: Date;

  // DatepickerRenderOptions
  displayMonths = 1;
  showWeekNumbers = true;

  // DatepickerFormatOptions
  locale = 'en';
  monthTitle = 'MMMM';
  yearTitle = 'YYYY';
  dayLabel = 'D';
  monthLabel = 'MMMM';
  yearLabel = 'YYYY';
  weekNumbers = 'w';

}
