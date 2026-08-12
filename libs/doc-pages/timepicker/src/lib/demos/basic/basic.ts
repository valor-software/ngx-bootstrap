import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-timepicker-basic',
  templateUrl: './basic.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTimepickerBasicComponent {
  mytime: Date = new Date();
}
