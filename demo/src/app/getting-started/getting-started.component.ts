import { Component } from '@angular/core';

let doc = require('html-loader!markdown-loader!./getting-started.md');

@Component({
  selector: 'getting-started',
  templateUrl: './getting-started.template.html'
})
export class GettingStartedComponent {
  public name = `Native Angular widgets for Bootstrap 3 and Bootstrap 4`;
  public doc:string = doc;
}
