import { Component } from '@angular/core';
import { BsDatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'demo-datepicker-date-custom-classes',
  templateUrl: './date-custom-classes.component.html'
})
export class DemoDatepickerDateCustomClassesComponent {
  dateCustomClasses: BsDatepickerDateCustomClasses[];

  constructor() {
    let now = new Date();
    let twoDaysAhead = new Date();
    twoDaysAhead.setDate(now.getDate() + 2);
    let fourDaysAhead = new Date();
    fourDaysAhead.setDate(now.getDate() + 4);

    this.dateCustomClasses = [
      { date: now, classes: [] },
      { date: twoDaysAhead, classes: ['bg-warning'] },
      { date: fourDaysAhead, classes: ['bg-danger', 'text-warning'] }
    ];
  }
}
