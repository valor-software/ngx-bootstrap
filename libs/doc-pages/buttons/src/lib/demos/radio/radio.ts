import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-buttons-radio',
  templateUrl: './radio.html',
  standalone: false
})
export class DemoButtonsRadioComponent {
  radioModel = 'Middle';
}
