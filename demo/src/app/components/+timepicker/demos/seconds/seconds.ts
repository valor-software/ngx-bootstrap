import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-seconds',
  templateUrl: './seconds.html'
})
export class DemoTimepickerSecondsComponent {
  public myTime: Date = new Date();
  public showSec: boolean = true;
}
