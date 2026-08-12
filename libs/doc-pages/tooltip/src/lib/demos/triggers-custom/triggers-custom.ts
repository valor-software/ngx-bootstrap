import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-tooltip-triggers-custom',
  templateUrl: './triggers-custom.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTooltipTriggersCustomComponent {}
