import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-custom-checkbox-value',
  templateUrl: './custom-checkbox-value.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoButtonsCustomCheckboxValueComponent {
  singleModel = '1';
}
