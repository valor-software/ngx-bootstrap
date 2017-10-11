import { Component } from '@angular/core';

import { DEMOS } from './demos';
import { ComponentExample } from '../../common/models/components-examples.model';
import { ComponentApi } from '../../common/models/components-api.model';
/*import { tooltipExamples, tooltipApi } from './tooltip-section.list';*/

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'tooltip-section',
  templateUrl: './tooltip-section.component.html'
})
export class TooltipSectionComponent {
  name: string = 'Tooltip';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tooltip';
  demos: any = DEMOS;
  titleDoc: string = titleDoc;
  /*tooltipExamples: ComponentExample[] = tooltipExamples;
  tooltipApi: ComponentApi[] = tooltipApi;*/
}
