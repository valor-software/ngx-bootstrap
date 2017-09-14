import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-dynamic',
  templateUrl: './dynamic.html'
})
export class DemoTimepickerDynamicComponent {
  public mytime: Date = new Date();
  public isValid: boolean;

  public update(): void {
    let d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    this.mytime = d;
  }

  public changed(): void {
    console.log('Time changed to: ' + this.mytime);
  }

  public clear(): void {
    this.mytime = void 0;
  }
}
