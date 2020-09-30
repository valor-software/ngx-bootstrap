import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-min-max',
  templateUrl: './min-max.html'
})
export class DemoTimepickerMinMaxComponent {
  myTime: Date = new Date();
  targetMinTime: Date = new Date();
  maxTime: Date = new Date();
  minTime: Date;

  constructor() {
    this.targetMinTime.setHours(8);
    this.targetMinTime.setMinutes(0);
    this.myTime.setHours(5);
    this.myTime.setMinutes(15);
    this.maxTime.setHours(17);
    this.maxTime.setMinutes(0);
  }

  setMinTime() {
    this.minTime = this.targetMinTime;
  }
}
