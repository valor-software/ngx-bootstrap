import { Component } from '@angular/core';

let doc = require('html-loader!markdown-loader!./getting-started.md');

@Component({
  selector: 'getting-started',
  templateUrl: './getting-started.component.html'
})
export class GettingStartedComponent {
  name = `Native Angular widgets for Bootstrap 3 and Bootstrap 4`;
  src = 'https://github.com/valor-software/ngx-bootstrap';
  doc: string = doc;
}
