// todo: add more samples https://jqueryui.com/accordion/#default
// todo: add more samples http://getbootstrap.com/components/#panels-alternatives

import { Component } from '@angular/core';
import { DEMOS } from './demos';
import { ComponentExample } from '../../common/models/components-examples.model';
import { ComponentApi } from '../../common/models/components-api.model';
import { accordionExamples, accordionApi } from './accordion-section.list';

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
  accordionExamples: ComponentExample[] = accordionExamples;
  accordionApi: ComponentApi[] = accordionApi;
}
