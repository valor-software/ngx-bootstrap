import { Component } from '@angular/core';

import { DEMOS } from './demos';
import { ComponentExample } from '../../common/models/components-examples.model';
import { ComponentApi } from '../../common/models/components-api.model';
/*import { timepickerExamples, timepickerApi } from './timepicker-section.list';*/

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'timepicker-section',
  templateUrl: './timepicker-section.component.html'
})
export class TimepickerSectionComponent {
  name: string = 'Timepicker';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/timepicker';
  demos: any = DEMOS;
  titleDoc: string = titleDoc;
  /*timepickerExamples: ComponentExample[] = timepickerExamples;
  timepickerApi: ComponentApi[] = timepickerApi;*/
}
