import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-seconds',
  templateUrl: './toggle-minutes-seconds.html'
})
export class DemoTimepickerToggleMinutesSecondsComponent {
  myTime: Date = new Date();
  showMin: boolean = true;
  showSec: boolean = true;

  toggleMinutes(): void {
    this.showMin = !this.showMin;
  }

  toggleSeconds(): void {
    this.showSec = !this.showSec;
  }

}
