import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-timepicker-mousewheel',
  templateUrl: './mousewheel.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTimepickerMousewheelComponent {
  allowMouseWheel = true;
  myTime = new Date();
}
