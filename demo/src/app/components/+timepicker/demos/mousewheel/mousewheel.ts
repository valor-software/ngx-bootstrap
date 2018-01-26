import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-mousewheel',
  templateUrl: './mousewheel.html'
})
export class DemoTimepickerMousewheelComponent {
  isEnabled = true;
  myTime1: Date = new Date();
}
