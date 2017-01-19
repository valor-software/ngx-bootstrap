import { Component } from '@angular/core';

@Component({
  selector: 'demo-accordion-disabled',
  templateUrl: './disabled.html'
})
export class DemoAccordionDisabledComponent {
  public status: Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
}
