import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-disabled',
  templateUrl: './disabled.html'
})
export class DemoTimepickerDisabledComponent {
  ismeridian: boolean = false;
  isEnabled: boolean = true;
  mytime: Date = new Date();
}
