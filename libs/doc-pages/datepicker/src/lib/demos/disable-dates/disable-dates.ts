import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-datepicker-datesdisabled',
  templateUrl: './disable-dates.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoDatepickerDatesDisabledComponent {
  disabledDates = [
    new Date('2020-02-05'),
    new Date('2020-02-09')
  ];
}
