import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-timepicker-meridian',
  templateUrl: './meridian.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTimepickerMeridianComponent {
  ismeridian = true;

  mytime: Date = new Date();

  toggleMode(): void {
    this.ismeridian = !this.ismeridian;
  }
}
