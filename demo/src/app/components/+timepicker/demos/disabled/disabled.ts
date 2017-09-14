import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-disabled',
  templateUrl: './disabled.html'
})
export class DemoTimepickerDisabledComponent {
  public ismeridian: boolean = false;
  public isEnabled: boolean = true;
  public mytime: Date = new Date();
}
