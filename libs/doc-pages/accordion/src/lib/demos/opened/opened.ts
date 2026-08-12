import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-accordion-opened',
  templateUrl: './opened.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoAccordionOpenedComponent {
  isFirstOpen = true;
}
