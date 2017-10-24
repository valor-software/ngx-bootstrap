import { Component } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';

import { DEMOS } from './demos';
import { ComponentExample } from '../../shared/models/components-examples.model';
import { ComponentApi } from '../../shared/models/components-api.model';
import { demoComponentContent } from './progressbar-section.list';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'progressbar-section',
  templateUrl: './progressbar-section.component.html'
})
export class ProgressbarSectionComponent {
  name = 'Progressbar';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/progressbar';

  get isBs3(): boolean {
    return isBs3();
  }

  demos: any = DEMOS;
  titleDoc: string = titleDoc;
  examplesBs3: ComponentExample[] = demoComponentContent.examplesBs3;
  examplesBs4: ComponentExample[] = demoComponentContent.examplesBs4;
  apiSections: ComponentApi[] = demoComponentContent.apiSections;
}
