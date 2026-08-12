import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-buttons-radio',
  templateUrl: './radio.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoButtonsRadioComponent {
  radioModel = 'Middle';
}
