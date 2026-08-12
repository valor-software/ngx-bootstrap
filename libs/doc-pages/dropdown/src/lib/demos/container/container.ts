import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-dropdown-container',
  templateUrl: './container.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoDropdownContainerComponent {}
