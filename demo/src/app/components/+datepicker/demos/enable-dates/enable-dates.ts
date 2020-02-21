import { Component } from '@angular/core';

@Component({
  selector: 'demo-datepicker-datesenabled',
  templateUrl: './enable-dates.html'
})
export class DemoDatepickerDatesEnabledComponent {
  enabledDates = [
    new Date('2020-02-06'),
    new Date('2020-02-08'),
    new Date('2020-02-11'),
  ];
}
