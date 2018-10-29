import { Component } from '@angular/core';

const AN_HOUR = 60 * 60 * 1000;

@Component({
  selector: 'demo-timepicker-offset',
  templateUrl: './offset.html'
})
export class DemoTimepickerOffsetComponent {
  mytime: Date = new Date();

  mintime = new Date(Date.now() - (AN_HOUR * 4));
  maxtime = new Date(Date.now() + (AN_HOUR * 4));

  offset = -200;
  showMeridian = true;
  offsetTarget = 'client';
}
