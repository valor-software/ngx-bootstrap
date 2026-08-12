import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-nested-dropdowns',
  templateUrl: './nested-dropdowns.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoNestedDropdownsComponent {}
