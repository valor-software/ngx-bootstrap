import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-datepicker-with-timepicker',
  templateUrl: './with-timepicker.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})

export class DemoDatepickerWithTimepickerComponent {
}
