import { Component, ViewEncapsulation } from '@angular/core';

import { DEMOS } from './demos';
import { ComponentExample } from '../../common/models/components-examples.model';
import { ComponentApi } from '../../common/models/components-api.model';
/*import { sortableExamples, sortableApi } from './sortable-section.list';*/

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');
let usageDoc = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'sortable-section',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sortable-section.component.html'
})
export class SortableSectionComponent {
  name: string = 'Sortable';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/blob/development/src/sortable';
  titleDoc: string = titleDoc;
  usageDoc: string = usageDoc;
  demos: any = DEMOS;
  /*sortableExamples: ComponentExample[] = sortableExamples;
  sortableApi: ComponentApi[] = sortableApi;*/
}
