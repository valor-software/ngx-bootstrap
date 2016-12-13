import { Component } from '@angular/core';

let dependencies = require('html!markdown!./docs/dependencies.md');
let installation = require('html!markdown!./docs/installation.md');
let readingDocumentation = require('html!markdown!./docs/reading-documentation.md');

@Component({
  selector: 'getting-started',
  templateUrl: './getting-started.template.html'
})
export class GettingStartedComponent {
  public name:string = `Native Angular 2 directives for bootstrap`;
  public desc:string = '';
  public dependencies:string = dependencies;
  public installation:string = installation;
  public readingDocumentation:string = readingDocumentation;
}
