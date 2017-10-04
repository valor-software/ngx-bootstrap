import { Component } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';
import { DEMOS } from './demos';

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
}
