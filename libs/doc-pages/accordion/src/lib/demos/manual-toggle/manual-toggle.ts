import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-accordion-manual-toggle',
  templateUrl: './manual-toggle.html',
  standalone: false
})
export class DemoAccordionManualToggleComponent {
  isOpen = true;
}
