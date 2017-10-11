import { Component } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';

import { DEMOS } from './demos';
import { ComponentExample } from '../../common/models/components-examples.model';
import { ComponentApi } from '../../common/models/components-api.model';
/*import { progressbarExamples, progressbarApi } from './progressbar-section.list';*/

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'progressbar-section',
  templateUrl: './progressbar-section.component.html'
})
export class ProgressbarSectionComponent {
  name: string = 'Progressbar';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/progressbar';

  get isBs3(): boolean {
    return isBs3();
  }

  demos: any = DEMOS;
  titleDoc: string = titleDoc;
  /*progressbarExamples: ComponentExample[] = progressbarExamples;
  progressbarApi: ComponentApi[] = progressbarApi;*/
}
