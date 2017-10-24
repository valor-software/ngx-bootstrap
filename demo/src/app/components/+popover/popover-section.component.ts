import { Component } from '@angular/core';

import { DEMOS } from './demos';
import { ComponentExample } from '../../shared/models/components-examples.model';
import { ComponentApi } from '../../shared/models/components-api.model';
import { demoComponentContent } from './popover-section.list';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'tooltip-section',
  templateUrl: './popover-section.component.html'
})
export class PopoverSectionComponent {
  name = 'Popover';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/popover';
  demos: any = DEMOS;
  titleDoc: string = titleDoc;
  examples: ComponentExample[] = demoComponentContent.examples;
  apiSections: ComponentApi[] = demoComponentContent.apiSections;
}
