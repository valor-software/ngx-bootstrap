import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-daterangepicker-display-one-month',
  templateUrl: './display-one-month.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
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
