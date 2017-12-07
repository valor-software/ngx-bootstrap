import { Component } from '@angular/core';

@Component({
  selector: 'demo-accordion-basic',
  templateUrl: './basic.html'
})
export class DemoAccordionBasicComponent {
  log(event: boolean) {
    console.log(`Accordion has been ${event ? 'opened' : 'closed'}`);
  }
}
