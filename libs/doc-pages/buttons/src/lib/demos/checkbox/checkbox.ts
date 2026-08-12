import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-buttons-checkbox',
  templateUrl: './checkbox.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoButtonsCheckboxComponent {
  checkModel: { left?: boolean; middle?: boolean; right?: boolean } = { left: false, middle: true, right: false };
}
