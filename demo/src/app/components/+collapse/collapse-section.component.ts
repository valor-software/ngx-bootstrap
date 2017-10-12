import { Component } from '@angular/core';
import { DEMOS } from './demos';

import { ComponentExample } from '../../common/models/components-examples.model';
import { ComponentApi } from '../../common/models/components-api.model';
import { collapseExamples, collapseApi } from './collapse-section.list';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'collapse-section',
  templateUrl: './collapse-section.component.html'
})
export class CollapseSectionComponent {
  name: string = 'Collapse';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/collapse';
  demos: any = DEMOS;
  titleDoc: string = titleDoc;
  collapseExamples: ComponentExample[] = collapseExamples;
  collapseApi: ComponentApi[] = collapseApi;
}
