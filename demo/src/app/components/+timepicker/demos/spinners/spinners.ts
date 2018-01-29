import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-spinners',
  templateUrl: './spinners.html'
})
export class DemoTimepickerSpinnersComponent {
  ismeridian = false;
  allowSpinners = true;
  mytime: Date = new Date();
}
