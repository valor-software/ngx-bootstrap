import { Component } from '@angular/core';

let doc = require('html-loader!markdown-loader!./getting-started.md');

@Component({
  selector: 'getting-started',
  templateUrl: './getting-started.template.html'
})
export class GettingStartedComponent {
  public name:string = `Bootstrap components for Angular`;
  public doc:string = doc;
}
