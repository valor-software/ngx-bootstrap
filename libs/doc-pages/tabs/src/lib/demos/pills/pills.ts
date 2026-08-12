import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-tabs-pills',
  templateUrl: './pills.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTabsPillsComponent {}
