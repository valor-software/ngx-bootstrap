import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-buttons-radio-with-group',
  templateUrl: './radio-with-group.html'
})
export class DemoButtonsRadioWithGroupComponent {
  radioModel = 'Middle';
  radioModelDisabled = 'Middle';
  modelGroupDisabled=false
}
