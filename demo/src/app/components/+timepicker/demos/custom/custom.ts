import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-custom',
  templateUrl: './custom.html'
})
export class DemoTimepickerCustomComponent {
  hstep: number = 1;
  mstep: number = 15;

  mytime: Date = new Date();
  options: any = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };
}
