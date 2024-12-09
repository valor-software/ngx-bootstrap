import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-buttons-disabled',
  templateUrl: './disabled.html',
  standalone: false
})
export class DemoButtonsDisabledComponent {
  disabled = false;
}
