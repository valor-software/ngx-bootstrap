import { Component } from '@angular/core';
import { DEMOS } from './demos';

import { ComponentExample } from '../../common/models/components-examples.model';
import { ComponentApi } from '../../common/models/components-api.model';
import { buttonsExamples, buttonsApi } from './buttons-section.list';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'buttons-section',
  templateUrl: './buttons-section.component.html'
})
export class ButtonsSectionComponent {
  name: string = 'Buttons';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/buttons';
  titleDoc: string = titleDoc;
  demos: any = DEMOS;
  buttonsExamples: ComponentExample[] = buttonsExamples;
  buttonsApi: ComponentApi[] = buttonsApi;
}
