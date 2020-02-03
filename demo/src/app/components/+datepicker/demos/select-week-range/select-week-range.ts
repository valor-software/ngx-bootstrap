import { Component } from '@angular/core';

@Component({
  selector: 'demo-datepicker-select-week-range',
  templateUrl: './select-week-range.html'
})
export class DemoDatePickerSelectWeekRangeComponent {
  disabledFirstWeekDays =[
    new Date('2020-01-05'),
    new Date('2020-01-12'),
    new Date('2020-01-19'),
    new Date('2020-01-26'),
    new Date('2020-01-05'),
  ];

  disabledWeekDays = [
    new Date('2020-02-01'),
    new Date('2020-02-02'),
    new Date('2020-02-03'),
    new Date('2020-02-04'),
    new Date('2020-02-05'),
    new Date('2020-02-06'),
    new Date('2020-02-07'),
    new Date('2020-02-08'),
  ]
}
