import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-tooltip-delay',
  templateUrl: './delay.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTooltipDelayComponent {}
