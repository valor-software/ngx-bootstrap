import { Component } from '@angular/core';
import { AccordionConfig } from 'ng2-bootstrap';

// such override allows to keep some initial values

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), {closeOthers: true});
}

@Component({
  selector: 'demo-accordion-config',
  templateUrl: './config.html',
  providers: [{provide: AccordionConfig, useFactory: getAccordionConfig}]
})
export class DemoAccordionConfigComponent {
}
