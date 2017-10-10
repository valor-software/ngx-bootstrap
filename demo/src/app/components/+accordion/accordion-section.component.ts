// todo: add more samples https://jqueryui.com/accordion/#default
// todo: add more samples http://getbootstrap.com/components/#panels-alternatives

import { Component } from '@angular/core';
import { DEMOS } from './demos';
import { ComponentData } from '../../common/models/components-data.model';
import { accordionItems } from './accordion-section.list';

import { DemoAccordionBasicComponent } from './demos/basic/basic';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'accordion-section',
  templateUrl: './accordion-section.components.html'
})
export class AccordionSectionComponent {
  name = 'Accordion';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/accordion';
  titleDoc: string = titleDoc;
  demos: any = DEMOS;
  accordionItems: ComponentData[] = accordionItems;

  test: any = DemoAccordionBasicComponent;
}
