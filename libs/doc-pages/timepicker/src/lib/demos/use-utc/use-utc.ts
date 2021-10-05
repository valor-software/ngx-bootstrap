import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-timepicker-use-utc',
  templateUrl: './use-utc.html'
})
export class DemoTimepickerUseUtcComponent {
  myTime: Date = new Date();
  useUtc = false;
}
