import { Component } from '@angular/core';

import { DEMOS } from './demos';
import { ComponentExample } from '../../common/models/components-examples.model';
import { ComponentApi } from '../../common/models/components-api.model';
/*import { paginationExamples, paginationApi } from './pagination-section.list';*/

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'pagination-section',
  templateUrl: './pagination-section.component.html'
})
export class PaginationSectionComponent {
  name: string = 'Pagination';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/pagination';
  demos: any = DEMOS;
  titleDoc: string = titleDoc;
  /*paginationExamples: ComponentExample[] = paginationExamples;
  paginationApi: ComponentApi[] = paginationApi;*/
}
