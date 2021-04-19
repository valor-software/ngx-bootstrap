import {Component} from '@angular/core';

@Component({
  selector: 'demo-datepicker-max-date-range',
  templateUrl: './max-date-range.html'
})
export class DemoDateRangePickerMaxDateRangeComponent {
  maxDate: Date;

  constructor() {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 30);
}
}
