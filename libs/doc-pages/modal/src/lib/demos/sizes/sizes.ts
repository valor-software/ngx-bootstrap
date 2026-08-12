import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-modal-sizes',
  templateUrl: './sizes.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoModalSizesComponent {}
