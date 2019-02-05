import { Component } from '@angular/core';

@Component({
  selector: 'demo-datepicker-datesdisabled',
  templateUrl: './disable-dates.html'
})
export class DemoDatepickerDatesDisabledComponent {
  disabledDates = [
    new Date('2019-02-04'),
    new Date('2019-02-08'),
    new Date('2019-02-17'),
    new Date('2019-02-19'),
    new Date('2019-02-23')
  ];
}
