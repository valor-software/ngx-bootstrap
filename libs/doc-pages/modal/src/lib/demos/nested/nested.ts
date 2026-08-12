import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-modal-nested',
  templateUrl: './nested.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoModalNestedComponent {}
