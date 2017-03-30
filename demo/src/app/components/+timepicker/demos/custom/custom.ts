import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-custom',
  templateUrl: './custom.html'
})
export class DemoTimepickerCustomComponent {
  public hstep: number = 1;
  public mstep: number = 15;

  public mytime: Date = new Date();
  public options: any = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };
}
