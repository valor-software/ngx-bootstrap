import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-popover-basic',
  templateUrl: './basic.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoPopoverBasicComponent {}
