import { Component } from '@angular/core';

@Component({
  selector: 'demo-datepicker-datesdisabled',
  templateUrl: './disable-dates.html'
})
export class DemoDatepickerDatesDisabledComponent {
  disabledDates = [
    new Date('2020-02-05'),
    new Date('2020-02-09')
  ];
}
