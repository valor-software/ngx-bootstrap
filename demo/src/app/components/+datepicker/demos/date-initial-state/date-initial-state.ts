import { Component } from '@angular/core';

@Component({
  selector: 'demo-datepicker-date-initial-state',
  templateUrl: './date-initial-state.html'
})
export class DemoDatepickerDateInitialStateComponent {
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
}
