import { Component } from '@angular/core';

import { DEMOS } from './demos';
import { ComponentExample } from '../../models/components-examples.model';
import { ComponentApi } from '../../models/components-api.model';
import { demoComponentContent } from './tooltip-section.list';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'tooltip-section',
  templateUrl: './tooltip-section.component.html'
})
export class TooltipSectionComponent {
  name: string = 'Tooltip';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tooltip';
  demos: any = DEMOS;
  titleDoc: string = titleDoc;
  examples: ComponentExample[] = demoComponentContent.examples;
  apiSections: ComponentApi[] = demoComponentContent.apiSections;
}
