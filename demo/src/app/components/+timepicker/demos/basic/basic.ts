import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-basic',
  templateUrl: './basic.html'
})
export class DemoTimepickerBasicComponent {
  public mytime: Date = new Date();
}
