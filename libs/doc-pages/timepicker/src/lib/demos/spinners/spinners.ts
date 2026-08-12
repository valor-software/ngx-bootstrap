import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-timepicker-spinners',
  templateUrl: './spinners.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTimepickerSpinnersComponent {
  isMeridian = false;
  showSpinners = true;
  myTime: Date = new Date();
}
