import { Injectable } from '@angular/core';
import { DatepickerFormatOptions, DatepickerRenderOptions } from './models/index';

@Injectable()
export class BsDatepickerConfig implements DatepickerRenderOptions,
  DatepickerFormatOptions {

  value?: Date | Date[];
  isDisabled?: boolean;
  minDate?: Date;
  maxDate?: Date;

  containerClass = 'theme-green';

  // DatepickerRenderOptions
  displayMonths = 1;
  showWeekNumbers = true;

  // range picker
  rangeSeparator = ' - ';

  // DatepickerFormatOptions
  locale = 'en';
  monthTitle = 'MMMM';
  yearTitle = 'YYYY';
  dayLabel = 'D';
  monthLabel = 'MMMM';
  yearLabel = 'YYYY';
  weekNumbers = 'w';

}
