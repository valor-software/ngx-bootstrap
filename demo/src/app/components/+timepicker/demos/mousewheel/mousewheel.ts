import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-mousewheel',
  templateUrl: './mousewheel.html'
})
export class DemoTimepickerMousewheelComponent {
  allowMouseWheel = true;
  myTime: Date = new Date();
}
