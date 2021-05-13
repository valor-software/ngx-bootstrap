import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-disabled',
  templateUrl: './disabled.html'
})
export class DemoTimepickerDisabledComponent {
  isMeridian = true;
  isDisabled = true;
  myTime = new Date();
}
