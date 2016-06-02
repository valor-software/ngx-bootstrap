import {Component} from '@angular/core';

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
export class GettingStartedSectionComponent {
  public name:string = name;
  public desc:string = desc;
  public dependencies:string = dependencies;
  public installation:string = installation;
  public readingDocumentation:string = readingDocumentation;
}
