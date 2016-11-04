import { Component } from '@angular/core';

let desc = ``;
// let dependencies = require('./dependencies.md');
let dependencies = '';
// let installation = require('./installation.md');
let installation = '';
// let readingDocumentation = require('./reading-documentation.md');
let readingDocumentation = '';

@Component({
  selector: 'getting-started',
  templateUrl: './getting-started.template.html'
})
export class GettingStartedComponent {
  public name:string = `Native Angular 2 directives for bootstrap`;
  public desc:string = desc;
  public dependencies:string = dependencies;
  public installation:string = installation;
  public readingDocumentation:string = readingDocumentation;
}
