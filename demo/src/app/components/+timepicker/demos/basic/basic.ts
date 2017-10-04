import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-basic',
  templateUrl: './basic.html'
})
export class DemoTimepickerBasicComponent {
  mytime: Date = new Date();
}
