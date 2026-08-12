import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-buttons-disabled',
  templateUrl: './disabled.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoButtonsDisabledComponent {
  disabled = false;
}
