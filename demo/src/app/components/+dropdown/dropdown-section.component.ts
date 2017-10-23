import { Component } from '@angular/core';
import { DEMOS } from './demos';

import { ComponentExample } from '../../shared/models/components-examples.model';
import { ComponentApi } from '../../shared/models/components-api.model';
import { demoComponentContent } from './dropdown-section.list';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'dropdown-section',
  templateUrl: './dropdown-section.component.html'
})
export class DropdownSectionComponent {
  name: string = 'Dropdowns';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/dropdown';
  demos: any = DEMOS;
  titleDoc: string = titleDoc;
  examples: ComponentExample[] = demoComponentContent.examples;
  apiSections: ComponentApi[] = demoComponentContent.apiSections;
}
