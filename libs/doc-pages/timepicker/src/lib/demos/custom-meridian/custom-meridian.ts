import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-timepicker-custom-meridian',
  templateUrl: './custom-meridian.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTimepickerCustomMeridianComponent {
  mytime: Date = new Date();
  meridians = ['AM(Midnight to Noon)', 'PM(Noon to Midnight)'];
}
