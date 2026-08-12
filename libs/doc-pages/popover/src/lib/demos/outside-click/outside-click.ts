import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-popover-outside-click',
  templateUrl: './outside-click.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoPopoverOutsideClickComponent {}
