import { Component, ViewChild } from '@angular/core';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'demo-datepicker-datesdisabled',
  templateUrl: './disable-dates.html'
})
export class DemoDatepickerDatesDisabledComponent {
  disabledDates = [
    new Date('2020-02-05'),
    new Date('2020-02-09')
  ];

// THIS IS FOR TESTING PURPOSES
// SHOULD BE REVERTED BACK AFTER REVIEW

/*  @ViewChild('datePicker', { static: false }) datePicker: BsDaterangepickerDirective;
  @ViewChild('dateRangePicker', { static: false }) dateRangePicker: BsDaterangepickerDirective;
  name = 'Ngx Bootstrap';
  disabledDates2 = [
    new Date('2020-02-19'),
    new Date('2020-02-20'),
    new Date('2020-02-21')
  ];
  maxDate = new Date('2020-02-29')
  bsInlineValue = new Date('2020-02-18');

  update() {
    this.disabledDates2 = [
      new Date('2020-02-22'),
      new Date('2020-02-23'),
      new Date('2020-02-24')
    ]
    this.maxDate = new Date('2020-03-02')
    console.log('Disabled dates should be updated but aren\'t');
  }*/
}
