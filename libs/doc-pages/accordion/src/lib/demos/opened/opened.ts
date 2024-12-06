import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-accordion-opened',
  templateUrl: './opened.html',
  standalone: false
})
export class DemoAccordionOpenedComponent {
  isFirstOpen = true;
}
