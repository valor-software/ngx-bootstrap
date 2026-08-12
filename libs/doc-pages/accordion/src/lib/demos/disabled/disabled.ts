import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-accordion-disabled',
  templateUrl: './disabled.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoAccordionDisabledComponent {
  isFirstDisabled = false;
}
