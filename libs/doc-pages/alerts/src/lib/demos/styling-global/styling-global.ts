import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-alert-styling-global',
  templateUrl: './styling-global.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoAlertStylingGlobalComponent {}
