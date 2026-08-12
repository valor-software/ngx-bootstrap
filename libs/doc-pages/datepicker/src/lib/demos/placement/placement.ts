import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-datepicker-placement',
  templateUrl: './placement.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoDatepickerPlacementComponent {}
