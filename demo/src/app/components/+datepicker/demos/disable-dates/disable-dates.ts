import { Component } from '@angular/core';

@Component({
  selector: 'demo-datepicker-datesdisabled',
  templateUrl: './disable-dates.html'
})
export class DemoDatepickerDatesDisabledComponent {
  disabledDates = [
    new Date('2019-02-05'),
    new Date('2019-02-09')
  ];

  enabledDates = [
    new Date('2020-02-06'),
    new Date('2020-02-07'),
    new Date('2020-02-08'),
    new Date('2020-02-09'),
  ];
}
