import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-seconds',
  templateUrl: './seconds.html'
})
export class DemoTimepickerSecondsComponent {
  myTime: Date = new Date();
  showSec: boolean = true;
}
