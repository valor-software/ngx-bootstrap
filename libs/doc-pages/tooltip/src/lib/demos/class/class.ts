import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-tooltip-class',
  templateUrl: './class.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTooltipClassComponent {}
