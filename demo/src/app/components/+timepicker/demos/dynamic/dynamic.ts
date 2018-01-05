import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-dynamic',
  templateUrl: './dynamic.html'
})
export class DemoTimepickerDynamicComponent {
  mytime: Date = new Date();
  isValid: boolean;

  update(): void {
    let d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    this.mytime = d;
  }

  changed(): void {
    console.log('Time changed to: ' + this.mytime);
  }

  clear(): void {
    this.mytime = void 0;
  }
}
