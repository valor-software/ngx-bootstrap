import {Component} from 'angular2/core';

let name = 'First of all, Welcome!';

// webpack html imports
let template = require('./getting-started.template.html');

let desc = require('./description.md');
let dependencies = require('./dependencies.md');
let installation = require('./installation.md');
let readingDocumentation = require('./reading-documentation.md');

@Component({
  selector: 'accordion-section',
  template: template
})

export class GettingStartedSection {
  private name:string = name;
  private desc:string = desc;
  private dependencies:string = dependencies;
  private installation:string = installation;
  private readingDocumentation:string = readingDocumentation;
}
