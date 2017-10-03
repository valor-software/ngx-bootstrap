import { Component } from '@angular/core';
import { DEMOS } from './demos';

// webpack html imports
let titleDoc = require('html-loader!markdown-loader!./docs/title.md');

@Component({
  selector: 'collapse-section',
  templateUrl: './collapse-section.component.html'
})
export class CollapseSectionComponent {
  name: string = 'Collapse';
  src: string = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/collapse';
  demos: any = DEMOS;
  titleDoc: string = titleDoc;
}
