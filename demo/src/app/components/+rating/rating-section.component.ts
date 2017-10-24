import { Component } from '@angular/core';

import { DEMOS } from './demos';
import { ComponentExample } from '../../shared/models/components-examples.model';
import { ComponentApi } from '../../shared/models/components-api.model';
import { demoComponentContent } from './rating-section.list';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'rating-section',
  templateUrl: './rating-section.component.html'
})
export class RatingSectionComponent {
  name = 'Rating';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/rating';
  demos: any = DEMOS;
  titleDoc: string = titleDoc;
  examples: ComponentExample[] = demoComponentContent.examples;
  apiSections: ComponentApi[] = demoComponentContent.apiSections;
}
