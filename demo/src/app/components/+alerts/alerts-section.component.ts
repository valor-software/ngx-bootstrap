import { Component } from '@angular/core';
import { DEMOS } from './demos';

import { ComponentExample } from '../../shared/models/components-examples.model';
import { ComponentApi } from '../../shared/models/components-api.model';
import { demoComponentContent } from './alerts-section.list';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/usage.md');

@Component({
  selector: 'alert-section',
  templateUrl: './alerts-section.component.html'
})
export class AlertsSectionComponent {
  name: string = 'Alerts';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/alert';
  titleDoc: string = titleDoc;
  demos: any = DEMOS;
  componentContent: any = demoComponentContent;
  examples: ComponentExample[] = demoComponentContent.examples;
  apiSections: ComponentApi[] = demoComponentContent.apiSections;
}
