import { Component } from '@angular/core';

import { DEMOS } from './demos';
import { ComponentExample } from '../../common/models/components-examples.model';
import { ComponentApi } from '../../common/models/components-api.model';
/*import { ratingExamples, ratingApi } from './rating-section.list';*/

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'rating-section',
  templateUrl: './rating-section.component.html'
})
export class RatingSectionComponent {
  name: string = 'Rating';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/rating';
  demos: any = DEMOS;
  titleDoc: string = titleDoc;
  /*ratingExamples: ComponentExample[] = ratingExamples;
  ratingApi: ComponentApi[] = ratingApi;*/
}
