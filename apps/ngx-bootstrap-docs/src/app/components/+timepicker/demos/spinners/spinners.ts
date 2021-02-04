import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-spinners',
  templateUrl: './spinners.html'
})
export class DemoTimepickerSpinnersComponent {
  isMeridian = false;
  showSpinners = true;
  myTime: Date = new Date();
}
