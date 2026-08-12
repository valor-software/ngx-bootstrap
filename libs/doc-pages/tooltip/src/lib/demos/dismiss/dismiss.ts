import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-tooltip-dismiss',
  templateUrl: './dismiss.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTooltipDismissComponent {}
