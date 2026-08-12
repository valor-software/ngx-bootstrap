import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-popover-delay',
  templateUrl: './delay.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoPopoverDelayComponent {}
