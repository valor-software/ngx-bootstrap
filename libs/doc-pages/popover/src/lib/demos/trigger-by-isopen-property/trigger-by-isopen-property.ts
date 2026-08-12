import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-popover-trigger-by-isopen',
  templateUrl: './trigger-by-isopen-property.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoPopoverByIsOpenPropComponent {
  isOpen = false;
}
