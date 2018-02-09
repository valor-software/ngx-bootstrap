import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-mousewheel',
  templateUrl: './mousewheel.html'
})
export class DemoTimepickerMousewheelComponent {
  allowMouseWheel = true;
  myTime = new Date();
}
