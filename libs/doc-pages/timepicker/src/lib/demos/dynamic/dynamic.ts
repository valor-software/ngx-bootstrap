import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-timepicker-dynamic',
  templateUrl: './dynamic.html'
})
export class DemoTimepickerDynamicComponent {
  mytime: Date | undefined = new Date();
  isValid?: boolean;

  update(): void {
    const time = new Date();
    time.setHours(14);
    time.setMinutes(0);

    this.mytime = time;
  }

  changed(): void {
    console.log(`Time changed to: ${this.mytime}`);
  }

  clear(): void {
    this.mytime = void 0;
  }
}
