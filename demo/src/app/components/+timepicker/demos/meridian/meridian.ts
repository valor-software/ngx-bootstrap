import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-meridian',
  templateUrl: './meridian.html'
})
export class DemoTimepickerMeridianComponent {
  ismeridian: boolean = true;

  mytime: Date = new Date();

  toggleMode(): void {
    this.ismeridian = !this.ismeridian;
  }
}
