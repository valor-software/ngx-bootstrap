import { Component } from '@angular/core';

import { DEMOS } from './demos';
import { ComponentExample } from '../../common/models/components-examples.model';
import { ComponentApi } from '../../common/models/components-api.model';
/*import { popoverExamples, popoverApi } from './popover-section.list';*/

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'tooltip-section',
  templateUrl: './popover-section.component.html'
})
export class PopoverSectionComponent {
  name: string = 'Popover';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/popover';
  demos: any = DEMOS;
  titleDoc: string = titleDoc;
  /*popoverExamples: ComponentExample[] = popoverExamples;
  popoverApi: ComponentApi[] = popoverApi;*/
}
