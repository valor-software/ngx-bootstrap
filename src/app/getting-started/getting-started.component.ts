import { Component } from '@angular/core';

let desc = ``;
let dependencies = require('html!markdown!./dependencies.md');
let installation = require('html!markdown!./installation.md');
let readingDocumentation = require('html!markdown!./reading-documentation.md');

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
