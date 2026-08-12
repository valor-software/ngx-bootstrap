import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-timepicker-isvalid',
  templateUrl: './isvalid.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTimepickerIsValidComponent {
  isMeridian = true;
  myTime = new Date();
  valid = true;

  isValid(event: boolean): void {
    this.valid = event;
  }
}
