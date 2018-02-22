import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-custom-meridian',
  templateUrl: './custom-meridian.html'
})
export class DemoTimepickerCustomMeridianComponent {
  mytime: Date = new Date();
  meridians = ['12H', '24H'];
}
