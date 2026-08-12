import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-timepicker-readonly',
  templateUrl: './readonly.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTimepickerReadonlyComponent {
  isMeridian = false;
  readonly = true;
  myTime = new Date();
}
