import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-isvalid',
  templateUrl: './isvalid.html'
})
export class DemoTimepickerIsValidComponent {
  isMeridian = true;
  myTime = new Date();
  valid = true;

  isValid(event: boolean): void {
    this.valid = event;
  }
}
