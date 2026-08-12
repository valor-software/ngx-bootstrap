import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-dropdown-disabled-item',
  templateUrl: './disabled-item.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoDropdownDisabledItemComponent {}
