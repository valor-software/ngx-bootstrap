// https://api.jqueryui.com/datepicker/
import { Component } from '@angular/core';

import { DEMOS } from './demos';
import { ComponentExample } from '../../common/models/components-examples.model';
import { ComponentApi } from '../../common/models/components-api.model';
import { datepickerExamples, datepickerOldExamples, datepickerApi,  datepickerOldApi } from './datepicker-section.list';

// webpack html imports
let oldTitleDoc = require('html-loader!markdown-loader!./docs/titleOld.md');
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'datepicker-section',
  templateUrl: './datepicker-section.component.html'
})
export class DatepickerSectionComponent {
  name: string = 'Datepicker';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/datepicker';
  demos: any = DEMOS;
  oldTitleDoc: string = oldTitleDoc;
  titleDoc: string = titleDoc;
  datepickerExamples: ComponentExample[] = datepickerExamples;
  datepickerOldExamples: ComponentExample[] = datepickerOldExamples;
  datepickerApi: ComponentApi[] = datepickerApi;
  datepickerOldApi: ComponentApi[] = datepickerOldApi;
}
