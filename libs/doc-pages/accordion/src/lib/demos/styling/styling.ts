import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-accordion-styling',
  templateUrl: './styling.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoAccordionStylingComponent {
  customClass = 'customClass';
  isFirstOpen = true;
}
