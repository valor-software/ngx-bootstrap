import { Component } from '@angular/core';

@Component({
  selector: 'demo-prevent-change-to-next-month',
  templateUrl: './prevent-change-to-next-month.component.html'
})
export class DemoDatepickerPreventChangeToNextMonthComponent {
  maxDate = new Date();

  constructor() {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
  }
}
