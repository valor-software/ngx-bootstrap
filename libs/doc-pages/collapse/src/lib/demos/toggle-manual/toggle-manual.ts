import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'toggle-manual-demo',
  templateUrl: './toggle-manual.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ToggleManualDemoComponent {
  isOpen = false;
}
