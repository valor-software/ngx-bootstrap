import { Component } from '@angular/core';

@Component({
  selector: 'demo-daterangepicker-display-one-month',
  templateUrl: './display-one-month.html'
})
export class DemoDateRangePickerDisplayOneMonth {
  today: Date;
  maxDate: Date;
  minDate: Date;

  constructor() {
    this.today = new Date();
    this.minDate = new Date(this.today.getFullYear(), this.today.getMonth(), 2);
    this.maxDate = new Date(this.today.getFullYear(), this.today.getMonth(), 25);
  }
}
